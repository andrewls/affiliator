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

export default AmazonTransformer;
