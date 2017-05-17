var keystone = require('keystone');

exports = module.exports = function(req, res, next) {

    var locals = res.locals;

    locals.utils = keystone.utils;
    locals.user = req.user;
    locals.page = req.session.page;
    locals.language = req.session.language;

    next();

};