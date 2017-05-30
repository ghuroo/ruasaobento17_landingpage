var keystone = require('keystone');

exports = module.exports = function(req, res) {

    res.send(req.navigation.menu.about.url);
};