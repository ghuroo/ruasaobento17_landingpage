var keystone = require('keystone'),
    url = require('url'); // built-in utility

exports = module.exports = function(req, res, next) {

    var locals = res.locals;

    locals.utils = keystone.utils;
    locals.user = req.user;

    locals.page = req.page;
    locals.language = req.languageObject;
    locals.navigation = req.navigation;

    // var url = url.parse(req.url).pathname;
    locals.url = req.protocol + '://' + req.hostname + req.path;

    locals.cloudinaryPath = keystone.get('cloudinary public path');

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

    locals.filters = {
        'cloudinary': function(image) {
            return keystone.get('cloudinary public path') + image.public_id + '.' + image.format;
        }
    };

    next();

};