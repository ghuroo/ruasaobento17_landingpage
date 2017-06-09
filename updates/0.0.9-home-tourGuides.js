var keystone = require('keystone'),
	async = require('async'),
	HomeTourGuide = keystone.list('HomeTourGuide'),
    Language = keystone.list('Language');

var items = [
    {
        name: 'Antonio Cardiello',
        text: '<p>Doutor em filosofia pela Faculdade de Letras da Universidade de Lisboa. É membro do Centro de Filosofia (CFUL) do mesmo instituto e membro do Nietzsche International Lab (NIL) do Instituto de Filosofia da Universidade Nova de Lisboa (IFILNOVA). Co-director do projecto da Biblioteca de Fernando Pessoa (on-line desde 2010), editou  Uma Stirpe incognita  (EDB Edizioni, 2016) e  co-editou  A Biblioteca particular de Fernando Pessoa  (D. Quixote, 2010) e  Nietzsche e Pessoa. Ensaios  (Tinta-da-china, 2016). Comissário de exposições internacionais sobre Fernando Pessoa, interessa-se pelo pensamento português contemporâneo e pela aproximação entre tradições filosóficas ocidentais e orientais.</p>',

        idioms: 'pt',

        language: 'pt',
    }
]

function createItem(item, done) {
    Language.model.findOne({ iso: item.language }).exec(function(err, result) {
        item.language = [result];
        item.idioms = [result];

        HomeTourGuide.model.findOne({ name: item.name }).exec(function(err, result) {
            if (err || result) return done();

            new HomeTourGuide.model(item).save(function(err) {

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
