var keystone = require('keystone'),
    cloudinary = require('cloudinary'),
    Promise = require('bluebird'),
    request = require('request'),
    _ = require('underscore'),
    fs = require('fs'),
    mkdirp = require('mkdirp');

function backup(document, image) {

    return new Promise((resolve, reject) => {        

        var folderPath = keystone.get('cloudinary assets path') + image.public_id.substr(0, image.public_id.lastIndexOf('/'));
        var filePath = keystone.get('cloudinary assets path') + image.public_id + '.' + image.format;
        
        mkdirp(folderPath, function(error) {
            if (error) return reject(error);

            request(image.url)
            .pipe(fs.createWriteStream(filePath))
            .on('close', (error, result) => {

                return resolve(filePath);

            });
        });
    });
}

var List = keystone.list('HomeBanner'),
    model = List.model;
    
// var field = 'images';

module.exports = (req, res) => {

    List = keystone.list(req.params.list);
    model = List.model;
    
    var field = req.params.field || 'images';

    var tasks = [];

    var query;
    query = model.find().exec();

    return query
    .then((result) => {

        return Promise.each(result, (item, index) => {
            var imageUrl;

            // find if image field it's an object // item[field] > item.property.child
            if (_.isArray(item.covers.front)) {

                // for (var i = 0; i < item.covers.front.length; i++) {
                for (var i = 0; i < item[field].length; i++) {
                    tasks.push(backup(item, item[field][i]));
                    // tasks.push(backup(item, item.covers.front[i]));
                }

            } else if (_.isObject(item[field])) {
            // } else if (_.isObject(item.covers.front)) {
                tasks.push(backup(item, item[field]));
                // tasks.push(backup(item, item.covers.front));
            } else {
                console.error('wrong field name');
            }

            return Promise.resolve();

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

        res.send('ok');
    }).catch((error) => {
        console.error(error);

        res.send(error);
    });
};