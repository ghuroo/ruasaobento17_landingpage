var keystone = require('keystone'),
	async = require('async'),
	HomeBanner = keystone.list('HomeBanner'),
    Language = keystone.list('Language');

var items = [
    {
        title: 'Em Lisboa fique na casa onde morou',
        subTitle: 'Fernando Pessoa',
        
        images: [
            {
                "width" : 1400,
                "height" : 702,
                "format" : "jpg",
                "resource_type" : "image",
                "url" : "/images/_placeholders/slider-1.jpg",
                "secure_url" : "/images/_placeholders/slider-1.jpg",
                "public_id" : "",
                "version" : 1000000000,
                "signature" : ""
            },
            {
                "width" : 1400,
                "height" : 702,
                "format" : "jpg",
                "resource_type" : "image",
                "url" : "/images/_placeholders/slider-2.jpg",
                "secure_url" : "/images/_placeholders/slider-2.jpg",
                "public_id" : "",
                "version" : 1000000000,
                "signature" : ""
            },
        ],

        state: 'published',
        dateStart: Date.now(),
        expires: '',
        dateEnd: '',
        language: 'pt',
    }
];

function createItem(item, done) {
    Language.model.findOne({ iso: item.language }).exec(function(err, result) {
        item.language = [result];

        HomeBanner.model.findOne({ title: item.title }).exec(function(err, result) {
            if (err || result) done();

            new HomeBanner.model(item).save(function(err) {

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
