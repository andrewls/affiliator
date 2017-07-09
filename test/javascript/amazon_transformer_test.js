import test from 'ava';
import AmazonTransformer from '../../vendor/assets/javascripts/amazon_transformer';

let transformer = new AmazonTransformer('affiliatetag-02')
const links = {
	'https://www.amazon.com/Hobbit-Battle-Five-Armies/dp/B00R2LTNL2/ref=sr_1_14?s=instant-video&rps=1&ie=UTF8&qid=1499447723&sr=1-14&refinements=p_85%3A0%2Cp_n_entity_type%3A14069184011': 'https://smile.amazon.com/dp/B00R2LTNL2?tag=affiliatetag-02',
	'https://www.amazon.com/Hobbit-Battle-Five-Armies/dp/B00R2LTNL2': 'https://smile.amazon.com/dp/B00R2LTNL2?tag=affiliatetag-02'
}

let for_all_links = fn => {
	Object.keys(links).forEach(link => { fn(link) });
}

test('can transform links correctly', t => {
	for_all_links(link => {
		t.is(transformer.transform(link), links[link]);
	});
});

test('if link does not contain an ASIN, it is not transformed', t => {
	let link = 'https://www.amazon.com'
	t.is(transformer.transform('https://www.amazon.com'), link)
});

test('if tag is not provided in initialization, no transformation takes place', t => {
	let testTransformer = new AmazonTransformer()
	for_all_links(link => {
		t.is(testTransformer.transform(link), link);
	});
});
