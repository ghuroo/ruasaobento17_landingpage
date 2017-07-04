var keystone = require('keystone'),
    cloudinary = require('cloudinary'),
    Promise = require('bluebird'),
    _ = require('underscore');

var List = keystone.list('HomeBanner'),
    model = List.model;

var cloudinarier = require('./');

// var field = 'images';

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {

        List = keystone.list(req.params.list);
        model = List.model;
        
        var field = req.params.field || 'images';

        var tasks = [];

        var query;
        query = model.find().exec();

        return query
        .then((result) => {

            return Promise.each(result, (item, index) => {

                tasks = cloudinarier.tasks(item, field);

                // // find if image field it's an object // item[field] > item.property.child
                // if (_.isArray(item.covers.front)) {

                //     // for (var i = 0; i < item.covers.front.length; i++) {
                //     for (var i = 0; i < item[field].length; i++) {
                //         tasks.push(cloudinarier.save(item, item[field][i]));
                //         // tasks.push(cloudinarier.save(item, item.covers.front[i]));
                //     }

                // } else if (_.isObject(item[field])) {
                // // } else if (_.isObject(item.covers.front)) {
                //     tasks.push(cloudinarier.save(item, item[field]));
                //     // tasks.push(cloudinarier.save(item, item.covers.front));
                // } else {
                //     console.error('wrong field name');
                // }

                // return Promise.resolve();

                return;

            }).then(() => {
                
                return Promise.each(tasks, (result) => {
                    console.log(result);

                }).then(() => {

                    return Promise.resolve();
                }).catch((error) => {
                    throw Error(error);
                });

            }).catch((error) => {
                throw Error(error);
            });

        }).then(() => {

            // res.send('ok');
            return Promise.resolve();
        }).catch((error) => {
            console.error(error);

            // res.send(error);
            return Promise.reject();
        });
    });
};