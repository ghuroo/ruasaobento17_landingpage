var keystone = require('keystone'),
    importRoutes = keystone.importer(__dirname),
    i18n = require("i18n"), // i18n support
    passport = require('passport'); // passport support
    
var flashMessages = require('./middlewares/flashMessages.js'), // flash messages
    // errors = require('./middlewares/errors.js'), // error handling
    dev = require('./middlewares/dev.js'), // setup dev variables
    page = require('./middlewares/page.js'), // setup dev variables
    menu = require('./middlewares/menu.js'), // setup menu object
    locals = require('./middlewares/locals.js'), // handle locals to front-end
    seo = require('./middlewares/seo'); // retrieve seo object

keystone.pre('routes', passport.initialize());
keystone.pre('routes', passport.session());

keystone.pre('routes', i18n.init);

// keystone.pre('routes', errors);

// development
// keystone.pre('routes', dev);

// keystone.pre('render', flashMessages);
keystone.pre('render', seo);
keystone.pre('render', locals);

// load routes
var routes = {
    views: importRoutes('./views'),
    api: importRoutes('./api')
};

function signout(req, res) {
    return keystone.session.signout(req, res, function() {
        req.flash('info', 'Sessão terminada com sucesso.');
        req.logout();
        res.redirect('back');
    });
}

// bind routes
exports = module.exports = function(app) {

    // user
    // app.post('/user/signin', passport.authenticate('local'), (req, res) => res.redirect(req.body.redirect));
    app.get('/user/signout', signout);

    // home
    app.get('/', [page, menu], routes.views.home);

    // api
    app.get('/api/test', [menu], routes.api.test);

    // admin
    app.get('/keystone', (req, res) =>  { res.redirect(301, '/admin'); });

    // cloudinary importer
    app.get('/cloudinary/:list/:field', routes.views.cloudinary);
};
