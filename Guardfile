guard :rspec, all_on_start: true, cmd: 'rspec --color' do
    watch(/^spec\/.+_spec\.rb$/)
    watch(/^lib\/(.+)\.rb$/)     { |match| "spec/lib/#{match[1]}_spec.rb" }
    watch('spec/spec_helper.rb') { 'spec' }
    watch('app.rb')              { 'spec' }
end
