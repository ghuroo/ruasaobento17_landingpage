var passport = require('passport'),
    keystone = require('keystone'),
    User = keystone.list('User');

passport.serializeUser(function (user, callback) {
    // console.log('serializing user');
    callback(null, user._id);
});

passport.deserializeUser(function (userID, callback) {
    // console.log('deserializing user');
    User.model.findById(userID, function (er, user) {
        callback(er, user);
    });
});

require('./facebook.js');
require('./local.js');
