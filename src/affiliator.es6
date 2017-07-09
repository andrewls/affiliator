class AmazonTransformer {
	constructor(tag) {
		this.base = "https://smile.amazon.com/dp/"
		this.suffix = `?tag=${tag}`
	}

	transform(link) {
		if (this.suffix === '?tag=undefined') return link
		let asin = this.asin(link)
		if (asin) return `${this.base}${this.asin(link)}${this.suffix}`
		else return link
	}

	asin(link) {
		let matches = link.match(/\/[A-Za-z0-9]{10}\/?/g)
		if (matches) {
			return matches[0].match(/[A-Za-z0-9]{10}/g)[0]
		}
		else {
			return null
		}
	}
}

class NoopTransformer {
	transform(link) {
		return link
	}
}

let transformers = {
	'amazon': AmazonTransformer
}

class AffiliateManager {
	constructor() {
		this.affiliates = {
			noop: new NoopTransformer()
		}
	}

	addAffiliate(affiliateName, ...affiliateInformation) {
		this.affiliates[affiliateName] = new transformers[affiliateName](...affiliateInformation)
	}

	getAffiliateForLink(link) {
		if (link.match(/^.*amazon.com.*/g) && this.affiliates['amazon']) return 'amazon'
		else return 'noop'
	}

	transformLink(link) {
		let affiliate = this.getAffiliateForLink(link)
		return this.affiliates[this.getAffiliateForLink(link)].transform(link)
	}
}

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

export { AmazonTransformer };
export { NoopTransformer };
export default AffiliateManager;
