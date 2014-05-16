require 'bundler'
Bundler.setup :default
require './app'

map '/' do
    run DiscoverUnfilteredQuiz
end
