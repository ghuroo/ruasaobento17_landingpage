var Promise = require('bluebird');

module.exports = (document, field) => {
    var cloudinarier = require('./');

    return new Promise((resolve, reject) => {
        var tasks = cloudinarier.tasks(document, field);
            
        return Promise.each(tasks, (result) => {
            console.log(result);

        }).then(() => {

            return Promise.resolve();
        }).catch((error) => {
            console.error(error);

            return Promise.reject(error);
        });
    });
}; 