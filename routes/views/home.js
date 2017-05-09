var keystone = require('keystone');

exports = module.exports = function(req, res, next) {

    var locals = res.locals;

    res.send(':D');

};