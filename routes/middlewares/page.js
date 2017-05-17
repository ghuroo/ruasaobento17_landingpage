var Promise = require('bluebird'),
    _ = require('underscore'),
    keystone = require('keystone'),
    i18n = require('i18n'),
    Language = keystone.list('Language'),
    Page = keystone.list('Page');

function changeLocale(locale) {
    if (locale) {
        locale = i18n.changeLocale(locale);
    } else {
        locale = i18n.getLocale();
    }
    
    return locale;
}

function findPage(page, locale) {
    return new Promise((resolve, reject) => {
        
        var newPage;

        // if it has same url for multiple languages
        // search for correct one based on current language
        if (page.length > 1) {
            
            for (var i=0; i<page.length; i++) {
                if (page[i].language.iso == locale) {
                    newPage = page[0];
                }
            }

        } else { // if not, return it
            newPage = page[0];
        }

        if (!newPage) return reject(new Error('Page not found.'));

        return resolve(newPage);
    });
}

exports = module.exports = function(req, res, next) {
    var locals = res.locals;

    // change locale if requested, if not continue with previous
    var locale = changeLocale(req.query.locale);
    
    // find page with url
    var url = req.route.path || req.path || req.originalUrl;
    var query = Page.model.find()
    .where('url', url)
    .populate('language')
    .lean()
    .exec();

    return query
    .then((result) => {
        if (!result) return next(new Error(error));

        return findPage(result, locale);
    }).then((result) => {

        req.session.language = result.language;
        req.session.page = result;

        return next();
    }).catch((error) => {
        req.flash(error.message);
        
        return next(new Error(error));
    }); 

};