var keystone = require('keystone'),
    package = require('./package.json'),
    i18n = require('i18n'),
    _ = require('underscore');

// .env
require('dotenv').config({ path: __dirname + '/.env' });

// languages
var languages = [
    { value: 'pt', label: 'Português' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'it', label: 'Italiano' },
];

var locales = _.map(languages, (language) => { return language.value; });

// localization
i18n.configure({
    locales: locales,
    directory: __dirname + '/locales',
    defaultLocale: 'pt',
    autoReload: true,
    // syncFiles: false,
    objectNotation: true,
    // updateFiles: false
    updateFiles: true,
    cookie: 'locale'
});

keystone.init({
    'path': __dirname,
    'cloudinary assets path':  __dirname + '/assets/public/images/uploads/',
    'cloudinary public path':  '/images/uploads/',

    'port': process.env.PORT || 3000,

    // app info
    'name': package.title,
    'appname': package.name,
    'version': package.version,

    // public assets folder
    'static': ['assets/public'],

    'views': 'templates/views',
    'view engine': 'pug',

    'auto update': true,
    'mongo': process.env.MONGODB_URI,

    'session': true,
    'user model': 'User',
    'auth': true,
    'cookie secret': process.env.COOKIE_SECRET,

    // cloudinary
    'cloudinary config': process.env.CLOUDINARY_URL,
    'cloudinary prefix': package.name,
    'cloudinary folders': true,

    // helpers
    'languages': languages,

    // custom styles
    'adminui custom styles': 'assets/source/sass/base/_adminui.less',

});

require('./models');

keystone.set('routes', require('./routes'));

// passport
require('./routes/authentication/passport');

keystone.set('nav', {
    'utilizadores': 'User',
    'conteúdo': [
        'HomeBanner',
        'HomeHighlight',
        'HomeLocation',
        'HomeAbout',
        'HomeTour',
        'HomeTourGuide',
        'HomeManuscript',
        'HomeArticle',
        'HomeContact',
    ],
    'definições': [
        'Page',
        'Language',
        'Seo'
    ]
});

keystone.set('signin logo', '../favicon/favicon-160.png');

keystone.set('admin path', 'admin');

keystone.start();

// |--lib
// |  Custom libraries and other code
// |
// |--models
// |  Your application's database models (includes helper Models, Common Models and specific Models for each section of the site)
// |
// |--public
// |  Static files (css, js, images, etc.) that are publicly available
// |
// |--routes
// |  |--api
// |  |  Your application's api controllers
// |  |
// |  |--views
// |  |  Your application's view controllers
// |  |
// |  |--index.js
// |  |  Initialises your application's routes and views
// |  |
// |  |--middlewares
// |  |  Custom middleware for your routes (includes multi-language business logic)
// |
// |--templates
// |  |--includes
// |  |  Common .pug includes go in here
// |  |
// |  |--layouts
// |  |  Base .pug layouts go in here
// |  |
// |  |--mixins
// |  |  Common .pug mixins go in here
// |  |
// |  |--views
// |  |  Your application's view templates
// |
// |--updates
// |  Data population and migration scripts
// |
// |--package.json
// |  Project configuration for npm
// |
// |--web.js
// |  Main script that starts your application
