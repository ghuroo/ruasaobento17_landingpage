var Promise = require('bluebird'),
    keystone = require('keystone'),
    i18n = require('i18n'),
    Language = keystone.list('Language'),
    Page = keystone.list('Page');

function buildMenu(joint, locale) {

    var language,
        pages = [],
        newPages = {};

    var query = Language.model.findOne()
    .where('iso', locale)
    .lean()
    .exec();

    return query
    .then((result) => {
        if (!result) throw new Error('Cannot build navigation menu: missing languages.');

        language = result;

        query = Page.model.find()
        .where('language', language._id.toString())
        .lean()
        .exec();

        return query;
    }).then((result) => {
        if (!result) throw new Error('Cannot build navigation menu: missing pages.');

        pages = result;

        // create friendly object
        // (so we can retrieve pages with pages['page-name'].URL)
        for (var i = 0; i < pages.length; i++) {
            var name = pages[i].parent;
            if (pages[i].child) name += joint + pages[i].child;
            newPages[name] = pages[i];
        }

        return { menu: newPages, language: language };
    }).catch((error) => {

        throw error;
    });
}

exports = module.exports = function(req, res, next) {

    var locals = res.locals;

    var menu, locale = res.getLocale();

    return buildMenu('_', locale)
    .then((result) => {
        menu = result.menu;

        req.languageObject = result.language;

        if (req.navigation) req.navigation.menu = menu;
        else req.navigation = { menu: menu };

        next();
    }).catch((error) => {
        
        next(error);
    });
};