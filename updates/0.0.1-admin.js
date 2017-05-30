var keystone = require('keystone'),
    async = require('async'),
    User = keystone.list('User');

var items = [{
    name: {
        first: 'Administrator',
        last: 'Account'
    },
    email: 'admin@app.com',
    password: 'changethis',
    isAdmin: true
}];

function createItem(admin, done) {
    User.model.findOne({ email: admin.email }).exec(function (err, result) {
        if (err || result) done();

        new User.model(admin).save(function (err) {

            if (err) {
                console.error("Error adding item " + admin.email + " to the database:");
                console.error(err);
            } else {
                console.log("Added item " + admin.email + " to the database.");
            }

            done();
        });

    });
}

exports = module.exports = function (done) {
    async.forEach(items, createItem, done);
};
