var db = require('../db/db');
var assert = require('assert');
var product = require('./product');
const uuidV4 = require('uuid/v4');

var create = function (tagId, callback) {
    db.execute((db) => {
        var collection = db.collection('tags');
        collection.insertOne({tagId: tagId}, function (err, r) {
                assert.equal(null, err);
                console.log("Tag is created");
                callback(r.ops[0])
            }
        );
    });
};


var update = function (tagId, productId, callback) {
    db.execute((db) => {
        var collection = db.collection('tags');
        collection.update({tagId: tagId}, {$set: {productId: productId}}, function (err, r) {
                assert.equal(null, err);
                console.log("Tag is updated with product id");
                collection.findOne({tagId: tagId}, (e, r) => {
                    callback(r)
                });
            }
        );
    });
};


var addToCart = function (tagId, cartId, callback) {
    db.execute((db) => {
        var collection = db.collection('tags');
        collection.update({tagId: tagId}, {$set: {cartId: cartId}}, function (err, r) {
                assert.equal(null, err);
                console.log("Tag is add to a cart id");
                callback();
            }
        );
    });
};

var deleteFromCart = function (tagId, cartId, callback) {
    db.execute((db) => {
        var collection = db.collection('tags');
        collection.update({tagId: tagId, cartId: cartId}, {$set: {cartId: null}}, function (err, r) {
                assert.equal(null, err);
                console.log("Tag is removed from a cart id");
                callback();
            }
        );
    });
};

var getAllProductDetails = function (cart, callback) {
    db.execute((db) => {
        var cartId = cart._id;
        var collection = db.collection('tags');
        collection.find({cartId: cartId}).toArray(function (err, r) {
                assert.equal(null, err);
                product.getAll(r, (products) => {
                    var cartDetails = {
                        redirectUrl: 'http://' + process.env.serverAddress + '/cart/' + cartId,
                        value: products.map(a => a.price).reduce((a, b) => Number(a) + Number(b), 0),
                        products: products,
                        status: cart.status
                    };
                    callback(cartDetails)
                });
            }
        );
    });
};

var check = function (tagId, callback) {
    db.execute((db) => {
        var collection = db.collection('tags');
        collection.findOne({tagId: tagId}, function (err, r) {
                assert.equal(null, err);
                if (r.cartId) {
                    require('./cart').get(r.cartId, (cart) => callback(cart.stawtus == 'paid'))
                } else {
                    callback(false)
                }
            }
        );
    });
};

module.exports = {
    create: create,
    update: update,
    addToCart: addToCart,
    getAllProductDetails: getAllProductDetails,
    deleteFromCart: deleteFromCart,
    check: check
};