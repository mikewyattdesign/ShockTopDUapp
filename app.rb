require 'dotenv'
Dotenv.load
require 'bundler'
Bundler.setup :default, ENV['RACK_ENV']
require 'sinatra/base'
require 'sinatra/multi_route'
require 'sinatra/json'
require 'newrelic_rpm'
require 'koala'
require 'rollbar'
require 'json'
require './lib/facebook'
require './lib/age_gate'
require './lib/request_data_extractor'
require 'base64'
require 'openssl'
require 'digest/sha1'

# Main class for the DiscoverUnfilteredQuiz application
class DiscoverUnfilteredQuiz < Sinatra::Base
    register Sinatra::MultiRoute
    helpers Sinatra::JSON

    configure do
        set :protection, except: [:frame_options, :http_origin]
        set :logging, true
        set :public_folder, './public'

        Rollbar.configure do |config|
            config.access_token = ENV['ROLLBAR_ACCESS_TOKEN']
            config.environment = Sinatra::Base.environment
            config.framework = "Sinatra: #{Sinatra::VERSION}"
            config.root = Dir.pwd
        end
    end

    def old_enough?
        return true if present?(params[:old_enough])
        return true if AgeGate.new(params[:month], params[:day], params[:year]).valid?
        return true if Facebook.new(params[:signed_request]).old_enough?
        return false
    end

    def present?(value)
        !value.nil? && !value.empty?
    end

    route :post, :get, '/' do    
        @old_enough = old_enough?
        erb :index
    end

    get '/aws.json' do
        content_type :json

        # Create Policy and Signature for S3 POST Upload
        aws_info = {}
        aws_info['accessKeyId'] = ENV['AWS_ACCESS_KEY_ID']
        aws_info['secretAccessKey'] = ENV['AWS_SECRET_ACCESS_KEY']
        aws_info['region'] = "us-east-1"
        aws_info['bucket'] = ENV['S3_BUCKET_NAME']

        policy_document = {}
        policy_document['expiration'] = '2014-11-01T00:00:00.000Z'
        
        policy_document['conditions'] = [ ['eq','$bucket', aws_info['bucket']],
            ['eq','$acl','public-read'],
            ['starts-with', '$key', 'temp/'], 
            ['eq','$success_action_status','201'], 
            ["starts-with", "$Content-Type", "video"] 
        ]

        policy = Base64.encode64(policy_document.to_json).gsub("\n","")

        signature = Base64.encode64(
            OpenSSL::HMAC.digest(
                OpenSSL::Digest::Digest.new('sha1'), 
                aws_info['secretAccessKey'], policy)
            ).gsub("\n","")

        aws_info['policy'] = policy
        aws_info['signature'] = signature
        aws_info['policy_document'] = policy_document
        aws_info['policy_document_string'] = policy_document.to_json
        json aws_info
    end

    error do
        # To send an arbitrary message:
        Rollbar.report_message('Something went wrong')
        # To send the exception traceback:
        request_data = RequestDataExtractor.new.from_rack(env)
        Rollbar.report_exception(env['sinatra.error'], request_data)

        erb :error
    end
end
