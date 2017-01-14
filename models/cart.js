var db = require('../db/db');
var assert = require('assert');
const uuidV4 = require('uuid/v4');
var tag = require("./tag");

var create = function (callback) {
    db.execute((db) => {
        var collection = db.collection('carts');
        collection.insertOne({_id: uuidV4()}, function (err, r) {
                assert.equal(null, err);
                console.log("cart is created");
                callback(r.ops[0])
            }
        );
    });
};

var getDetails = function (cartId, callback) {
    tag.getAllProductDetails(cartId, callback)
};

module.exports = {
    create: create,
    getDetails: getDetails
};
