var keystone = require('keystone'),
	async = require('async'),
	Seo = keystone.list('Seo'),
    Language = keystone.list('Language');

var items = [
    {
        title: 'Rua de São Bento 17',
        description: 'Descrição',
        keywords: 'rua,sao,bento,alojamento,casa,fernando,pessoa',
        image: {
            "url" : "/favicon/favicon-310.png", "secure_url" : "/favicon/favicon-310.png",
            "width" : 310, "height" : 310, "format" : "png", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
        },
        language: 'pt'
    },
    {
        title: 'Rua de São Bento 17',
        description: 'Description',
        keywords: 'rua,sao,bento,hosting,house,fernando,pessoa',
        image: {
            "url" : "/favicon/favicon-310.png", "secure_url" : "/favicon/favicon-310.png",
            "width" : 310, "height" : 310, "format" : "png", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
        },
        language: 'en'
    }
];

function createItem(item, done) {
    Language.model.findOne({ iso: item.language }).exec(function(err, result) {
        item.language = [result];

        Seo.model.findOne({ title: item.title }).exec(function(err, result) {
            if (err || result) return done();

            new Seo.model(item).save(function(err) {

                if (err) {
                    console.error("Error adding item " + item.title + " to the database:");
                    console.error(err);
                } else {
                    console.log("Added item " + item.title + " to the database.");
                }

                done();
            });
        });
    });
}

exports = module.exports = function(done) {
	async.forEach(items, createItem, done);
};
