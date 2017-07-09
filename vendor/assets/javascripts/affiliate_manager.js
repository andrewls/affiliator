'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _amazon_transformer = require('./amazon_transformer');

var _amazon_transformer2 = _interopRequireDefault(_amazon_transformer);

var _noop_transformer = require('./noop_transformer');

var _noop_transformer2 = _interopRequireDefault(_noop_transformer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transformers = {
	'amazon': _amazon_transformer2.default
};

var AffiliateManager = function () {
	function AffiliateManager() {
		_classCallCheck(this, AffiliateManager);

		this.affiliates = {
			noop: new _noop_transformer2.default()
		};
	}

	_createClass(AffiliateManager, [{
		key: 'addAffiliate',
		value: function addAffiliate(affiliateName) {
			for (var _len = arguments.length, affiliateInformation = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				affiliateInformation[_key - 1] = arguments[_key];
			}

			this.affiliates[affiliateName] = new (Function.prototype.bind.apply(transformers[affiliateName], [null].concat(affiliateInformation)))();
		}
	}, {
		key: 'getAffiliateForLink',
		value: function getAffiliateForLink(link) {
			if (link.match(/^.*amazon.com.*/g) && this.affiliates['amazon']) return 'amazon';else return 'noop';
		}
	}, {
		key: 'transformLink',
		value: function transformLink(link) {
			var affiliate = this.getAffiliateForLink(link);
			return this.affiliates[this.getAffiliateForLink(link)].transform(link);
		}
	}]);

	return AffiliateManager;
}();

exports.default = AffiliateManager;
//# sourceMappingURL=affiliate_manager.js.map