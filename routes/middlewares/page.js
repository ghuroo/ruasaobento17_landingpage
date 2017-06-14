var Promise = require('bluebird'),
    _ = require('underscore'),
    keystone = require('keystone'),
    i18n = require('i18n'),
    Language = keystone.list('Language'),
    Page = keystone.list('Page');

function findPage(url, locale) {
    var page;

    var query = Page.model.find()
    .where('url', url)
    .populate('language')
    .lean()
    .exec();

    return query
    .then((result) => {
        if (!result) throw error;

        page = result;

        var newPage;

        // if it has same url for multiple languages
        // search for correct one based on current language
        if (page.length > 1) {
            
            for (var i=0; i<page.length; i++) {
                if (page[i].language.iso == locale) {
                    newPage = page[i];
                }
            }

        } else { // if not, return it
            newPage = page[0];
        }

        if (!newPage) throw new Error('Page not found.');

        return { page: newPage, language: newPage.language };
    }).catch((error) => {

        throw error;
    });
}

function buildLocaleVariationsMenu(currentPage) {
    var query = Page.model.find()
    .where('parent', currentPage.parent);

    if (currentPage.child) query.where('child', currentPage.child);
    
    query.populate('language')
    .lean()
    .exec();

    var variations;

    return query
    .then((result) => {
        if (!result) throw new Error('Cannot build variations menu: missing pages.');

        variations = result;

        // if current page locale versions share same URL:
        // add ?locale query parameter to each item, except for current page
        if (variations.length > 1) {
            for (var i = 0; i < variations.length; i++) {
                if (variations[i].slug !== currentPage.slug) {
                    if (variations[i].url == currentPage.url) {
                        variations[i].url += '?locale='+ variations[i].language.iso;
                    }
                }
            }
        }

        return variations;
    }).catch((error) => {

        throw error;
    });
}

exports = module.exports = function(req, res, next) {
    var locals = res.locals;

    // change locale if requested, if not, continue with previous
    var locale;
    if (req.query.locale) {
        locale = req.query.locale;
        res.setLocale(locale);
        req.setLocale(locale);
        res.cookie('locale', req.query.locale, { maxAge: 900000, httpOnly: true });
        locale = req.query.locale;
    } else {
        locale = res.getLocale();
    }
    
    var page, language, variations;
    
    // find page with url
    return findPage(req.route.path || req.path || req.originalUrl, locale)
    .then((result) => {
        page = result.page;
        language = result.language;

        return buildLocaleVariationsMenu(page);
    }).then((result) => {
        variations = result;

        req.page = page;
        req.languageObject = language;
        req.navigation = { variations: variations };

        return next();
    }).catch((error) => {
        
        return next(error);
    });
};