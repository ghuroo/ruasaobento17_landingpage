var keystone = require('keystone'),
	async = require('async'),
	Page = keystone.list('Page'),
	Language = keystone.list('Language');

var items = [
	// pt
    { language: 'pt', url: '/', parent: 'home', name: 'Ínicio' },
	{ language: 'pt', url: '/about', parent: 'about', name: 'Sobre Nós' },
];

function createItem(item, done) {
	Language.model.findOne({ iso: item.language }).exec(function(err, result) {
        if (err || !result) {
            return done(new Error('Page language', item.language, 'not found'));
        }

        item.language = result;

		Page.model.findOne({ name: item.name }).exec(function(err, result) {
			new Page.model(item).save(function(err) {

				if (err) {
					console.error("Error adding page " + item.name + " to the database:");
					console.error(err);
				} else {
					console.log("Added page " + item.name + " to the database.");
				}

				done();
			});
		});
	});
}

exports = module.exports = function(done) {
	async.forEach(items, createItem, done);
};
