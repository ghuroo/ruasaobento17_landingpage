var keystone = require('keystone'),
    User = keystone.list('User'),
    LocalStrategy = require('passport-local').Strategy,
    passport = require('passport');

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, function (req, email, password, done) {

    User.model.findOne({ email: email }).exec(function (err, result) {
        if (err) return done(err);

        if (result) return done(null, result);

        // if there is no user found with that email, create them
        var newUser = {
            // generic User data
            name: {
                first: req.body.firstName,
                last: req.body.lastName
            },
            email: req.body.email,
            password: req.body.password,
            isAdmin: false
        };

        new User.model(newUser).save(function (err, result) {
            if (err) return done(err);

            console.log("Added user " + result.email + " to the database.");

            return done(null, result);
        });

    });

}));
