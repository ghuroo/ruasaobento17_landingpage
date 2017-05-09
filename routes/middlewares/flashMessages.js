var _ = require('underscore'),
    keystone = require('keystone');

// Fetches and clears the flashMessages before a view is rendered
exports = module.exports = function(req, res, next) {

    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };

    res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;

    next();

};
