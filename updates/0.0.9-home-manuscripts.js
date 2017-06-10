var keystone = require('keystone'),
	async = require('async'),
	HomeManuscript = keystone.list('HomeManuscript'),
    Language = keystone.list('Language');

var items = [
    {
        name: 'Diário Pessoal',
        covers: {
            front: {
                "url" : "/images/manuscritos/diario-pessoal/front.jpg", "secure_url" : "/images/manuscritos/diario-pessoal/front.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
            back: {
                "url" : "/images/manuscritos/back.jpg", "secure_url" : "/images/manuscritos/back.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
        },
        pages: [
            {
                "url" : "/images/manuscritos/diario-pessoal/1.jpg", "secure_url" : "/images/manuscritos/diario-pessoal/1.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
            {
                "url" : "/images/manuscritos/diario-pessoal/2.jpg", "secure_url" : "/images/manuscritos/diario-pessoal/1.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
            {
                "url" : "/images/manuscritos/diario-pessoal/2.jpg", "secure_url" : "/images/manuscritos/diario-pessoal/1.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
        ],
        language: 'pt'
    },
    {
        name: 'Diários de Leitura',
        covers: {
            front: {
                "url" : "/images/manuscritos/diarios-leitura/front.jpg", "secure_url" : "/images/manuscritos/diarios-leitura/front.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
            back: {
                "url" : "/images/manuscritos/back.jpg", "secure_url" : "/images/manuscritos/back.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
        },
        pages: [
            {
                "url" : "/images/manuscritos/diarios-leitura/1.jpg", "secure_url" : "/images/manuscritos/diarios-leitura/1.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
            {
                "url" : "/images/manuscritos/diarios-leitura/2.jpg", "secure_url" : "/images/manuscritos/diarios-leitura/1.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
            {
                "url" : "/images/manuscritos/diarios-leitura/2.jpg", "secure_url" : "/images/manuscritos/diarios-leitura/1.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
        ],
        
        language: 'pt'
    },
    {
        name: 'Textos & Anotações',
        covers: {
            front: {
                "url" : "/images/manuscritos/textos-anotacoes/front.jpg", "secure_url" : "/images/manuscritos/textos-anotacoes/front.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
            back: {
                "url" : "/images/manuscritos/back.jpg", "secure_url" : "/images/manuscritos/back.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
        },
        pages: [
            {
                "url" : "/images/manuscritos/textos-anotacoes/1.jpg", "secure_url" : "/images/manuscritos/textos-anotacoes/1.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
            {
                "url" : "/images/manuscritos/textos-anotacoes/2.jpg", "secure_url" : "/images/manuscritos/textos-anotacoes/1.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
            {
                "url" : "/images/manuscritos/textos-anotacoes/2.jpg", "secure_url" : "/images/manuscritos/textos-anotacoes/1.jpg",
                "width" : 1126, "height" : 839, "format" : "jpg", "resource_type" : "image", "public_id" : "", "version" : 1000000000, "signature" : ""
            },
        ],

        language: 'pt'
    }
];

function createItem(item, done) {
    Language.model.findOne({ iso: item.language }).exec(function(err, result) {
        item.language = [result];

        HomeManuscript.model.findOne({ name: item.name }).exec(function(err, result) {
            if (err || result) return done();

            new HomeManuscript.model(item).save(function(err) {

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
