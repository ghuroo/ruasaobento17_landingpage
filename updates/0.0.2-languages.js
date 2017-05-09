var keystone = require('keystone'),
	async = require('async'),
	Language = keystone.list('Language'),
    _ = require('underscore');

languagesConfig = keystone.get('languages');
var languages = [];
_.each(languagesConfig, function(object){ languages.push({ iso: object.value, name: object.label }); });

function createItem(item, done) {
	Language.model.findOne({ iso: item.iso }).exec(function(err, result) {
		if (err || result) next();

		new Language.model(item).save(function(err) {

			if (err) {
				console.error("Error adding item " + item.name + " to the database:");
				console.error(err);
			} else {
				console.log("Added item " + item.name + " to the database.");
			}

			done();
		});
	});
}

exports = module.exports = function(done) {
	async.forEach(languages, createItem, done);
};
