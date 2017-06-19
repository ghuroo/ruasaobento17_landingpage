var keystone = require('keystone'),
    Seo = keystone.list('Seo');

exports = module.exports = function(req, res, next) {
    var locals = res.locals;

    var query = Seo.model.findOne().where('language', req.languageObject._id.toString()).lean().exec();
    
    query.then(function(result) {
        req.seo = result;

        locals.seo = req.seo;

        next();
    }).catch((error) => {
        next(new Error(error));
    });

};