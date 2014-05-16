require 'spec_helper'

feature 'Shock Top Discover Unfiltered Quiz' do
    it 'has functional routing' do
        visit '/'
        expect(page.title).to match(/Discover Unfiltered/i)
    end
end
