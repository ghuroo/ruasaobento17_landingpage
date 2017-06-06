var keystone = require('keystone');

exports = module.exports = function(req, res, next) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    // highlights
    var highlights = [];
    
    highlights.push({
        'title': 'Uma experiência inesquecível',
        'body': 'A partir de agora vai poder viver uma  Lisboa diferente , de uma maneira mais exclusiva e inspiradora : venha se hospedar no mesmo apartamento onde morou o grande poeta Fernando Pessoa entre 1905-1906. Aqui, nesse mesmo ambiente ele viveu, escreveu e sonhou. Por essas mesmas janelas ele viu a Lisboa do inicio do século passar.<br/>É essa experiência que o convidamos a viver agora.'
    },{
        'title': 'O apartamento',
        'body': 'Este espaçoso apartamento de 120 m2, fica situado no 2º andar de um prédio histórico datado de 1857.<br/>A sua planta é toda original e foi cuidadosamente decorado, criando um ambiente charmoso e muito aconchegante.<br/>São 2 quartos com ar condicionado, 2 salas ( sala de estar e sala de jantar ) , 1 casa de banho e cozinha adornada com raros azuleijos portugueses do final do século 19. O apartamento também conta com um confortável canto de leitura.'
    });

    // flipbook
    var flipbooks = [
        {
            title: 'Diário Pessoal',
            slug: 'diario-pessoal',
            covers: {
                front: '/images/manuscritos/diario-pessoal/front.jpg',
                back: '/images/manuscritos/back.jpg'
            },
            pages: [
                '/images/manuscritos/diario-pessoal/1.jpg',
                '/images/manuscritos/diario-pessoal/2.jpg',
                '/images/manuscritos/diario-pessoal/3.jpg',
            ]
        },
        {
            title: 'Diários de Leitura',
            slug: 'diarios-de-leitura',
            covers: {
                front: '/images/manuscritos/diarios-leitura/front.png',
                back: '/images/manuscritos/back.jpg'
            },
            pages: [
                '/images/manuscritos/diarios-leitura/1.jpg',
                '/images/manuscritos/diarios-leitura/2.jpg',
                '/images/manuscritos/diarios-leitura/3.jpg',
            ]
        },
        {
            title: 'Textos & Anotações',
            slug: 'textos-and-anotacoes',
            covers: {
                front: '/images/manuscritos/textos-anotacoes/front.png',
                back: '/images/manuscritos/back.jpg'
            },
            pages: [
                '/images/manuscritos/textos-anotacoes/1.jpg',
                '/images/manuscritos/textos-anotacoes/2.jpg',
                '/images/manuscritos/textos-anotacoes/3.jpg',
            ]
        }
    ];

    // locals
    locals.highlights = highlights;
    locals.flipbooks = flipbooks;

    view.render('home');
};