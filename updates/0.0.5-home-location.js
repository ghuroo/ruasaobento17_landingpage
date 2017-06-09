var keystone = require('keystone'),
	async = require('async'),
	HomeLocation = keystone.list('HomeLocation'),
    Language = keystone.list('Language');

var items = [
    {
        name: 'Localização',
        text: '<p>A localização também é um ponto alto. O apartamento fica no centro histórico de Lisboa , na Rua de São Bento, nº 17. Apenas 10 minutos a pé do Bairro Alto e Chiado , vizinho a supermercados, padarias, livrarias, museus, restaurantes e com transporte passando na porta de casa – o tradicional elétrico 28, o mesmo que o Fernando Pessoa costumava apanhar e que opera até hoje interligando toda a cidade antiga.</p>',

        image: {
            "width" : 592,
            "height" : 532,
            "format" : "jpg",
            "resource_type" : "image",
            "url" : "/images/_placeholders/google-maps.jpg",
            "secure_url" : "/images/_placeholders/google-maps.jpg",
            "public_id" : "",
            "version" : 1000000000,
            "signature" : ""
        },

        language: 'pt',
    }
]

function createItem(item, done) {
    Language.model.findOne({ iso: item.language }).exec(function(err, result) {
        item.language = [result];

        HomeLocation.model.findOne({ name: item.name }).exec(function(err, result) {
            if (err || result) return done();

            new HomeLocation.model(item).save(function(err) {

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
