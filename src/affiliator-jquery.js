import AffiliateManager from './affiliate_manager'

window.AffiliateManager = AffiliateManager;
// Jquery plugin

(function( $ ) {
	// console.log("Function is running")
    $.fn.affiliate = function(affiliateManager) {
        this.filter("a").each(function() {
            let link = $(this)
            link.attr('href', affiliateManager.transformLink(link.attr('href')))
        })
        return this
    }
})(jQuery)	
	
