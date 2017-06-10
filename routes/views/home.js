var keystone = require('keystone'),
    _ = require('underscore');

var Banner = keystone.list('HomeBanner'),
    Highlight = keystone.list('HomeHighlight'),
    Location = keystone.list('HomeLocation'),
    About = keystone.list('HomeAbout'),
    Manuscript = keystone.list('HomeManuscript'),
    Tour = keystone.list('HomeTour'),
    TourGuide = keystone.list('HomeTourGuide'),
    Article = keystone.list('HomeArticle'),
    Contact = keystone.list('HomeContact');

exports = module.exports = function(req, res, next) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    var query;

    query = Banner.model.find()
    .where('language', req.language._id)
    .sort('dateStart')
    .exec();

    query
    .then((result) => {
        locals.banners  = _.filter(result, function(object){ return object.isActive; });

        query = Highlight.model.findOne()
        .where('language', req.language._id)
        .lean()
        .exec();

        return query;
    }).then((result) => {
        locals.highlights = result;

        query = Location.model.findOne()
        .where('language', req.language._id)
        .lean()
        .exec();

        return query;
    }).then((result) => {
        locals.location = result;

        query = About.model.findOne()
        .where('language', req.language._id)
        .lean()
        .exec();

        return query;
    }).then((result) => {
        locals.about = result;

        query = Manuscript.model.find()
        .where('language', req.language._id)
        .lean()
        .exec();

        return query;
    }).then((result) => {
        locals.manuscripts = result;

        query = Tour.model.findOne()
        .where('language', req.language._id)
        .lean()
        .exec();

        return query;
    }).then((result) => {
        locals.tour = result;

        query = TourGuide.model.find()
        .where('language', req.language._id)
        .populate('idioms')
        .lean()
        .exec();

        return query;
    }).then((result) => {
        locals.tourGuides = result;

        query = Article.model.find()
        .where('language', req.language._id)
        .lean()
        .exec();

        return query;
    }).then((result) => {
        locals.articles = result;

        query = Contact.model.find()
        .where('language', req.language._id)
        .lean()
        .exec();

        return query;
    }).then((result) => {
        locals.contacts = result;

        view.render('home');
    }).catch((error) => {
        req.flash('error', error.message);

        next(Error(error));
    });
};


// locals.flipbooks = flipbooks;