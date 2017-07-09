(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./amazon_transformer":3,"./noop_transformer":4}],2:[function(require,module,exports){
"use strict";

var _affiliate_manager = require("./affiliate_manager");

var _affiliate_manager2 = _interopRequireDefault(_affiliate_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Jquery plugin
var jQuery = jQuery || undefined;
if (jQuery) {
	(function ($) {
		$.fn.affiliate = function (affiliateManager) {
			console.log("Calling affiliate");
			this.filter("a").each(function () {
				var link = $(this);
				link.attr('href', affiliateManager.transformLink(link.attr('href')));
			});
			return this;
		};
	})(jQuery);
}

},{"./affiliate_manager":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AmazonTransformer = function () {
	function AmazonTransformer(tag) {
		_classCallCheck(this, AmazonTransformer);

		this.base = "https://smile.amazon.com/dp/";
		this.suffix = "?tag=" + tag;
	}

	_createClass(AmazonTransformer, [{
		key: "transform",
		value: function transform(link) {
			if (this.suffix === '?tag=undefined') return link;
			var asin = this.asin(link);
			if (asin) return "" + this.base + this.asin(link) + this.suffix;else return link;
		}
	}, {
		key: "asin",
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

exports.default = AmazonTransformer;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoopTransformer = function () {
	function NoopTransformer() {
		_classCallCheck(this, NoopTransformer);
	}

	_createClass(NoopTransformer, [{
		key: "transform",
		value: function transform(link) {
			return link;
		}
	}]);

	return NoopTransformer;
}();

exports.default = NoopTransformer;

},{}]},{},[2]);
