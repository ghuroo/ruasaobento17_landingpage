var keystone = require('keystone'),
    cloudinarier = require('../../libs/cloudinary');

exports = module.exports = function(req, res) {
    // res.send(req.navigation.menu.about.url);

    cloudinarier.backup(req, res)
    .then(() => {
        res.send('ok');
    }).catch(() => {
        res.send(error);
    });
};