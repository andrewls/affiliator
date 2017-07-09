import test from 'ava';
import AffiliateManager from '../../vendor/assets/javascripts/affiliate_manager';

let link = 'https://www.amazon.com/Hobbit-Battle-Five-Armies/dp/B00R2LTNL2/ref=sr_1_14?s=instant-video&rps=1&ie=UTF8&qid=1499447723&sr=1-14&refinements=p_85%3A0%2Cp_n_entity_type%3A14069184011'

test('new managers have a null-op affiliate by default', t => {
	t.truthy(new AffiliateManager().affiliates['noop'])
});

test('new managers do nothing to links passed in to them.', t => {
	t.is(new AffiliateManager().transformLink(link), link)
});

test('if a link does not match an affiliate, getAffiliateForLink returns noop', t => {
	t.is(new AffiliateManager().getAffiliateForLink(link), 'noop')
});

test('if an affiliate has been added for a link, getAffiliateForLink returns that affiliate', t => {
	let manager = new AffiliateManager()
	manager.addAffiliate('amazon', 'testtag')
	t.not(manager.getAffiliateForLink(link), manager.getAffiliateForLink('https://www.google.com'))
	t.is(manager.transformLink(link), 'https://smile.amazon.com/dp/B00R2LTNL2?tag=testtag')
});
