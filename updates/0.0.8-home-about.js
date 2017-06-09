var keystone = require('keystone'),
	async = require('async'),
	HomeAbout = keystone.list('HomeAbout'),
    Language = keystone.list('Language');

var items = [
    {
        name: 'Fernado Pessoa e este apartamento',
        text: '<p>O período em que Fernando Pessoa morou neste apartamento (1905 – 1906 ) é extremamente importante na vida dele , pois marca o seu reencontro com Portugal depois de 9 anos vivendo em Durban - Africa do Sul, com a sua mãe, irmãos e o padrasto que havia sido transferido. Em 1905 , Pessoa regressa sozinho á Lisboa a bordo do navio Herzog para frequentar o Curso Superior de Letras, indo morar com a irmã da sua mãe, a tia Anica, na Rua de São Bento nº 17, 2º andar esquerdo – exatamente neste mesmo apartamento que temos o prazer de lhe receber.</p>',

        images: [
            {
                "width" : 485,
                "height" : 584,
                "format" : "jpg",
                "resource_type" : "image",
                "url" : "/images/_placeholders/picture-1.jpg",
                "secure_url" : "/images/_placeholders/picture-1.jpg",
                "public_id" : "",
                "version" : 1000000000,
                "signature" : ""
            },
            {
                "width" : 485,
                "height" : 584,
                "format" : "jpg",
                "resource_type" : "image",
                "url" : "/images/_placeholders/picture-2.jpg",
                "secure_url" : "/images/_placeholders/picture-2.jpg",
                "public_id" : "",
                "version" : 1000000000,
                "signature" : ""
            },
        ],

        language: 'pt',
    }
]

function createItem(item, done) {
    Language.model.findOne({ iso: item.language }).exec(function(err, result) {
        item.language = [result];

        HomeAbout.model.findOne({ name: item.name }).exec(function(err, result) {
            if (err || result) return done();

            new HomeAbout.model(item).save(function(err) {

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
