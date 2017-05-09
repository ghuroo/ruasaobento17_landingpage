var keystone = require('keystone');

exports = module.exports = function(req, res, next) {

    var locals = res.locals;

    locals.utils = keystone.utils;
    locals.user = req.user;

    next();

};