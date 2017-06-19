var keystone = require('keystone');

exports = module.exports = function(req, res, next) {

    var locals = res.locals;

    locals.utils = keystone.utils;
    locals.user = req.user;

    locals.page = req.page;
    locals.language = req.languageObject;
    locals.navigation = req.navigation;

    locals.url = req.protocol + '://' + req.host + req.originalUrl;

    var package = require(keystone.get('path') + '/package.json');
    locals.package = {
        "name": package.name,
        "title": package.title,
        "desription": package.desription,
        "keyword": package.keyword,
        "copyright": package.copyright,
        "version": package.version,
        "author": package.author,
    };

    next();

};