'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AmazonTransformer = function () {
	function AmazonTransformer(tag) {
		_classCallCheck(this, AmazonTransformer);

		this.base = "https://smile.amazon.com/dp/";
		this.suffix = '?tag=' + tag;
	}

	_createClass(AmazonTransformer, [{
		key: 'transform',
		value: function transform(link) {
			if (this.suffix === '?tag=undefined') return link;
			var asin = this.asin(link);
			if (asin) return '' + this.base + this.asin(link) + this.suffix;else return link;
		}
	}, {
		key: 'asin',
		value: function asin(link) {
			var matches = link.match(/\/[A-Za-z0-9]{10}\/?/g);
			if (matches) {
				return matches[0].match(/[A-Za-z0-9]{10}/g)[0];
			} else {
				return null;
			}
		}
	}]);

	return AmazonTransformer;
}();

var NoopTransformer = function () {
	function NoopTransformer() {
		_classCallCheck(this, NoopTransformer);
	}

	_createClass(NoopTransformer, [{
		key: 'transform',
		value: function transform(link) {
			return link;
		}
	}]);

	return NoopTransformer;
}();

var transformers = {
	'amazon': AmazonTransformer
};

var AffiliateManager = function () {
	function AffiliateManager() {
		_classCallCheck(this, AffiliateManager);

		this.affiliates = {
			noop: new NoopTransformer()
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

// Jquery plugin
// if (jQuery) {
// 	(function( $ ) {
// 	    $.fn.affiliate = function(affiliateManager) {
// 	    	console.log("Calling affiliate")
// 	        this.filter("a").each(function() {
// 	            let link = $(this)
// 	            link.attr('href', affiliateManager.transformLink(link.attr('href')))
// 	        })
// 	        return this
// 	    }
// 	}(jQuery))	
// }

exports.AmazonTransformer = AmazonTransformer;
exports.NoopTransformer = NoopTransformer;
exports.default = AffiliateManager;
//# sourceMappingURL=affiliator.js.map