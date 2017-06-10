var keystone = require('keystone'),
	async = require('async'),
	HomeArticle = keystone.list('HomeArticle'),
    Language = keystone.list('Language');

var items = [
    {
        title: 'Titulo da Matéria 1',
        text: '“O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto...”',
        url: 'http://www.sapo.pt/',

        language: 'pt',
    },
    {
        title: 'Titulo da Matéria 2',
        text: '“O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto...”',
        url: 'http://www.sapo.pt/',

        language: 'pt',
    },
    {
        title: 'Titulo da Matéria 3',
        text: '“O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto...”',
        url: 'http://www.sapo.pt/',

        language: 'pt',
    }
];

function createItem(item, done) {
    Language.model.findOne({ iso: item.language }).exec(function(err, result) {
        item.language = [result];

        HomeArticle.model.findOne({ title: item.title }).exec(function(err, result) {
            if (err || result) return done();

            new HomeArticle.model(item).save(function(err) {

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
