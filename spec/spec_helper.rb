ENV['RACK_ENV'] = 'test'
require_relative '../app'
require 'rspec'
require 'capybara/rspec'

Capybara.app = DiscoverUnfilteredQuiz

RSpec.configure do |config|
    config.expect_with :rspec do |c|
        c.syntax = :expect
    end

    include Rack::Test::Methods
end
