var _ = require('underscore'),
    keystone = require('keystone');

// inits the error handler functions into 'res'
exports = module.exports = function(req, res, next) {

    res.err = function(err, title, message) {
        res.status(500).render('../errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message
        });
    };

    res.notfound = function(title, message) {
        res.status(404).render('../errors/404', {
            errorTitle: title,
            errorMsg: message
        });
    };

    next();

};