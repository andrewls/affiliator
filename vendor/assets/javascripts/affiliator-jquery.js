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
//# sourceMappingURL=affiliator-jquery.js.map