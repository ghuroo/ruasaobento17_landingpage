var keystone = require('keystone'),
	async = require('async'),
	HomeContact = keystone.list('HomeContact'),
    Language = keystone.list('Language');

var items = [
    {
        name: 'Bernardo',
        phone: '+351968733859',
        email: 'bs@staywithus.pt',

        language: 'pt',
    },
    {
        name: 'Ana Rita',
        phone: '+351968733859',
        email: 'ars@staywithus.pt',

        language: 'pt',
    }
];

function createItem(item, done) {
    Language.model.findOne({ iso: item.language }).exec(function(err, result) {
        item.language = [result];

        HomeContact.model.findOne({ name: item.name }).exec(function(err, result) {
            if (err || result) return done();

            new HomeContact.model(item).save(function(err) {

                if (err) {
                    console.error("Error adding item " + item.name + " to the database:");
                    console.error(err);
                } else {
                    console.log("Added item " + item.name + " to the database.");
                }

                done();
            });
        });
    });
}

exports = module.exports = function(done) {
	async.forEach(items, createItem, done);
};
