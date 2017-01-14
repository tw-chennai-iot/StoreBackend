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

var pay = function (cartId, callback) {
    db.execute((db) => {
        var collection = db.collection('carts');
        collection.update({_id: cartId}, {$set: {status: 'paid'}}, function (err, r) {
                assert.equal(null, err);
                console.log("cart is payed");
                callback();
            }
        );
    });
};

var getDetails = function (cartId, callback) {
    db.execute((db) => {
        var collection = db.collection('carts');
        collection.find({_id: cartId}).toArray(function (err, r) {
            tag.getAllProductDetails(r[0], callback)
        });
    });
};

module.exports = {
    create: create,
    getDetails: getDetails,
    pay: pay
};
