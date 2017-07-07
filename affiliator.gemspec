# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'affiliator/version'

Gem::Specification.new do |spec|
  spec.name          = "affiliator"
  spec.version       = Affiliator::VERSION
  spec.authors       = ["Andrew Stephenson"]
  spec.email         = ["Andrew.Stephenson123@gmail.com"]

  spec.summary       = %q{Transform all your links into affiliate links for various vendors.}
  spec.description   = %q{Extends jquery to allow you to transform regular links to sites like Amazon or Walmart and transform them into links with your affiliate information so you get credit for the referrals.}
  spec.homepage      = "https://www.github.com/andrewls/affiliator"
  spec.license       = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata['allowed_push_host'] = "TODO: Set to 'http://mygemserver.com'"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.14"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "minitest", "~> 5.0"
end
