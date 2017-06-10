var keystone = require('keystone'),
	async = require('async'),
	HomeTour = keystone.list('HomeTour'),
    Language = keystone.list('Language');

var items = [
    {
        title: 'Roteiros exclusivos',
        subTitle: 'Conheça a vida e a obra de Fernando Pessoa com os mais conceituados especialistas Pessoanos',
        text: 'Já pensou em tomar um café enquanto discute sobre a obra de Fernando Pessoa? Ou quem sabe, programar colóquios exclusivos e passeios personalizados pela Lisboa de Pessoa? Aproveite a sua estadia e viva essa experiência. Aqui você encontra o contato de conceituados pesquisadores Pessoanos, que irão lhe guiar pelo fascinante universo de Fernando Pessoa. <br> Uma experiência exclusiva para os hospedes da “Rua de São Bento, 17”',

        idioms: 'pt',

        language: 'pt',
    }
];

function createItem(item, done) {
    Language.model.findOne({ iso: item.language }).exec(function(err, result) {
        item.language = [result];
        item.idioms = [result];

        HomeTour.model.findOne({ name: item.name }).exec(function(err, result) {
            if (err || result) return done();

            new HomeTour.model(item).save(function(err) {

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
