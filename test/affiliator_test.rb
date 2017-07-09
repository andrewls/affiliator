require 'test_helper'

class AffiliatorTest < Minitest::Test
  def test_that_it_has_a_version_number
    refute_nil ::Affiliator::VERSION
  end
end
