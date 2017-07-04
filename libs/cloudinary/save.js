var keystone = require('keystone'),
    Promise = require('bluebird'),
    request = require('request'),
    fs = require('fs'),
    mkdirp = require('mkdirp');

module.exports = (document, image) => {

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
};