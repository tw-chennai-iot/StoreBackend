var db = require('../db/db');
var assert = require('assert');
const uuidV4 = require('uuid/v4');

var create = function (productName, callback) {
    db.execute((db) => {
        var collection = db.collection('products');
        collection.insertOne({_id: uuidV4(), name: productName}, function (err, r) {
                assert.equal(null, err);
                console.log("product is created");
                callback(r.ops[0])
            }
        );
    });
};

module.exports = {
    create: create
};
