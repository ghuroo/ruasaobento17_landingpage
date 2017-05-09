var keystone = require('keystone'),
    User = keystone.list('User'),
    FacebookStrategy = require('passport-facebook').Strategy,
    passport = require('passport');

passport.use('facebook', new FacebookStrategy({
    clientID: process.env.FACEBOOK_APPID,
    clientSecret: process.env.FACEBOOK_APPSECRET,
    callbackURL: process.env.FACEBOOK_CALLBACKURL,
    profileFields: process.env.FACEBOOK_PROFILEFIELDS
}, function(access_token, refresh_token, profile, done) {

    User.model.findOne({ facebookID: profile._json.id }).exec(function(err, result) {
        if (err) return done(err);

        if (result) return done(null, result);

        // if there is no user found with that facebook id, create them
        var newUser = {

            // facebook data
            facebook: {
                accessToken: access_token,
                iD: profile._json.id,
                firstName: profile._json.first_name,
                lastName: profile._json.last_name,
                ageRangeMin: profile._json.age_range.min,
                ageRangeMax: profile._json.age_range.max,
                gender: profile._json.gender,
                locale: profile._json.locale,
                timezone: profile._json.timezone,
                link: profile._json.link,
                email: profile._json.email,
            },

            // generic User data
            name: {
                first: profile._json.first_name,
                last: profile._json.last_name,
            },
            email: profile._json.email,
            isAdmin: false
        };

        new User.model(newUser).save(function(err, result) {
            if (err) return done(err);

            console.log("Added user " + result.email + " to the database.");

            return done(null, result);
        });

    });

}));

module.exports = passport;
