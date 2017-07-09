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
//# sourceMappingURL=amazon_transformer.js.map