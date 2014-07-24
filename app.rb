require 'dotenv'
Dotenv.load
require 'bundler'
Bundler.setup :default, ENV['RACK_ENV']
require 'sinatra/base'
require 'sinatra/multi_route'
require 'sinatra/cookies'
require 'newrelic_rpm'
require 'koala'
require 'rollbar'

require './lib/facebook'
require './lib/age_gate'
require './lib/request_data_extractor'


# Main class for the DiscoverUnfilteredQuiz application
class DiscoverUnfilteredQuiz < Sinatra::Base
    register Sinatra::MultiRoute
    helpers Sinatra::Cookies

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

    error do
        # To send an arbitrary message:
        Rollbar.report_message('Something went wrong')
        # To send the exception traceback:
        request_data = RequestDataExtractor.new.from_rack(env)
        Rollbar.report_exception(env['sinatra.error'], request_data)

        erb :error
    end
end
