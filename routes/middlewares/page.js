var keystone = require('keystone'),
    _ = require('underscore'),
    i18n = require('i18n'),
    Language = keystone.list('Language');

exports = module.exports = function(req, res, next) {

    var locals = res.locals;

    // view call with redirect:
    //     get all parameters
    //         find locale (if not found, continue)

    var locale;
    
    // if switching language
    if (req.query.locale) {
        locale = req.query.locale;

        return changeLocale(locale)
        .then((result) => {

        });
    } else {
        locale = i18n.getLocale();
    }

    next();

};