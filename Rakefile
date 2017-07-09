require "bundler/gem_tasks"
require "rake/testtask"

Rake::TestTask.new(:test) do |t|
  t.libs << "test"
  t.libs << "lib"
  t.libs << "vendor"
  t.test_files = FileList['test/**/*_test.rb']
end

task :npm_tests do
  system 'rake compile'
  puts "*** RUNNING JS TESTS ***"
  system 'npm test'
  puts "*** JS TESTS DONE ***"
end

task :all_tests do
  system 'rake test'
  system 'rake npm_tests'
end

task :compile do
	`./node_modules/.bin/babel -s --presets es2015 src --out-dir vendor/assets/javascripts`
end

task :run do 
	`rake compile`
	system 'node vendor/assets/javascripts/affiliator.js'
end

task :default => :all_tests
