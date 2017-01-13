var db = require('../db/db');
var assert = require('assert');

var create = function (name, emailId, callback) {
    db.execute((db) => {
        var collection = db.collection('users');
        collection.insertOne({name: name, email: emailId}, function (err, r) {
                assert.equal(null, err);
                console.log("User is created");
                callback(r.ops[0])
            }
        );
    });
};

module.exports = {
    create: create
};
