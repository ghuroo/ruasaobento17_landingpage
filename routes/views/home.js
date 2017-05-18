var keystone = require('keystone');

exports = module.exports = function(req, res, next) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    var keypoints = [];
    
    keypoints.push({
        'title': 'Uma experiência inesquecível',
        'body': 'A partir de agora vai poder viver uma  Lisboa diferente , de uma maneira mais exclusiva e inspiradora : venha se hospedar no mesmo apartamento onde morou o grande poeta Fernando Pessoa entre 1905-1906. Aqui, nesse mesmo ambiente ele viveu, escreveu e sonhou. Por essas mesmas janelas ele viu a Lisboa do inicio do século passar.<br/>É essa experiência que o convidamos a viver agora.'
    },{
        'title': 'O apartamento',
        'body': 'Este espaçoso apartamento de 120 m2, fica situado no 2º andar de um prédio histórico datado de 1857.<br/>A sua planta é toda original e foi cuidadosamente decorado, criando um ambiente charmoso e muito aconchegante.<br/>São 2 quartos com ar condicionado, 2 salas ( sala de estar e sala de jantar ) , 1 casa de banho e cozinha adornada com raros azuleijos portugueses do final do século 19. O apartamento também conta com um confortável canto de leitura.'
    },{
        'title': 'Localização',
        'body': 'A localização também é um ponto alto. O apartamento fica no centro histórico de Lisboa , na Rua de São Bento, nº 17.<br>Apenas 10 minutos a pé do Bairro Alto e Chiado , vizinho a supermercados, padarias, livrarias, museus, restaurantes e com transporte passando na porta de casa – o tradicional elétrico 28, o mesmo que o Fernando Pessoa costumava apanhar e que opera até hoje interligando toda a cidade antiga.'
    });

    locals.keypoints = keypoints;

    view.render('home');
};