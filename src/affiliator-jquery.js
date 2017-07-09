import AffiliateManager from './affiliate_manager'

// Jquery plugin
let jQuery = jQuery || undefined
if (jQuery) {
	(function( $ ) {
	    $.fn.affiliate = function(affiliateManager) {
	    	console.log("Calling affiliate")
	        this.filter("a").each(function() {
	            let link = $(this)
	            link.attr('href', affiliateManager.transformLink(link.attr('href')))
	        })
	        return this
	    }
	}(jQuery))	
}
	
