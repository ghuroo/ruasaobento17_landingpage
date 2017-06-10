var keystone = require('keystone'),
	async = require('async'),
	HomeHighlight = keystone.list('HomeHighlight'),
    Language = keystone.list('Language');

var items = [
    {
        name: 'Destaques',
        experience: {
            title: 'Uma experiência inesquecível',
            text: '<p>A partir de agora vai poder viver uma Lisboa diferente, de uma maneira mais exclusiva e inspiradora: venha se hospedar no mesmo apartamento onde morou o grande poeta Fernando Pessoa entre 1905-1906. Aqui, nesse mesmo ambiente ele viveu, escreveu e sonhou. Por essas mesmas janelas ele viu a Lisboa do inicio do século passar.<br>É essa experiência que o convidamos a viver agora.</p>'
        },
        apartment: {
            title: 'O apartamento',
            text: '<p>Este espaçoso apartamento de 120 m2, fica situado no 2º andar de um prédio histórico datado de 1857.<br/> A sua planta é toda original e foi cuidadosamente decorado, criando um ambiente charmoso e muito aconchegante.<br/> São 2 quartos com ar condicionado, 2 salas ( sala de estar e sala de jantar ), 1 casa de banho e cozinha adornada com raros azuleijos portugueses do final do século 19. O apartamento também conta com um confortável canto de leitura.</p>'
        },

        language: 'pt',
    }
]

function createItem(item, done) {
    Language.model.findOne({ iso: item.language }).exec(function(err, result) {
        item.language = [result];

        HomeHighlight.model.findOne({ name: item.name }).exec(function(err, result) {
            if (err || result) return done();

            new HomeHighlight.model(item).save(function(err) {

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
