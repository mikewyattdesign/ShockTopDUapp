ENV['RACK_ENV'] = 'test'
require_relative '../../app'
require 'rspec'

RSpec.configure do |config|
    config.expect_with :rspec do |c|
        c.syntax = :expect
    end

    include Rack::Test::Methods
end
