import AmazonTransformer from './amazon_transformer'
import NoopTransformer from './noop_transformer'

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

export default AffiliateManager;
