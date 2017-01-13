var db = require('../db/db');
var assert = require('assert');
const uuidV4 = require('uuid/v4');

var create = function (callback) {
    db.execute((db) => {
        var collection = db.collection('tags');
        collection.insertOne({_id: uuidV4()}, function (err, r) {
                assert.equal(null, err);
                console.log("Tag is created");
                callback(r.ops[0])
            }
        );
    });
};


var update = function (tagId, productId, callback) {
    console.log(tagId, productId);
    db.execute((db) => {
        var collection = db.collection('tags');
        collection.update({_id: tagId}, {productId: productId}, function (err, r) {
                assert.equal(null, err);
                console.log("Tag is updated with product id");
                collection.findOne({_id: tagId},(e,r) => {
                    callback(r)
                });
            }
        );
    });
};

module.exports = {
    create: create,
    update: update
};
