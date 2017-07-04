var _ = require('underscore');

module.exports = (document, field) => {
    var cloudinarier = require('./');

    var tasks = [];

    // find if image field it's an object // document[field] > document.property.child
    if (_.isArray(document[field])) {
    // if (_.isArray(document.covers.front)) {

        // for (var i = 0; i < document.covers.front.length; i++) {
        for (var i = 0; i < document[field].length; i++) {
            tasks.push(cloudinarier.save(document, document[field][i]));
            // tasks.push(cloudinarier.save(document, document.covers.front[i]));
        }

    } else if (_.isObject(document[field])) {
    // } else if (_.isObject(document.covers.front)) {
        tasks.push(cloudinarier.save(document, document[field]));
        // tasks.push(cloudinarier.save(document, document.covers.front));
    } else {
        console.error('wrong field name');
        throw new Error('wrong field name');
    }

    return tasks;
};