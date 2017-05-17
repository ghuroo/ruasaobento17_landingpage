var keystone = require('keystone');

exports = module.exports = function(req, res, next) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    view.render('home');
};