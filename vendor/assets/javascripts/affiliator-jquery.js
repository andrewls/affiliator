'use strict';

var _affiliate_manager = require('./affiliate_manager');

var _affiliate_manager2 = _interopRequireDefault(_affiliate_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.AffiliateManager = _affiliate_manager2.default;
// Jquery plugin

(function ($) {
    // console.log("Function is running")
    $.fn.affiliate = function (affiliateManager) {
        this.filter("a").each(function () {
            var link = $(this);
            link.attr('href', affiliateManager.transformLink(link.attr('href')));
        });
        return this;
    };
})(jQuery);
//# sourceMappingURL=affiliator-jquery.js.map