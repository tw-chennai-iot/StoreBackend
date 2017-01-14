var db = require('../db/db');
var assert = require('assert');
var product = require('./product');
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
    db.execute((db) => {
        var collection = db.collection('tags');
        collection.update({_id: tagId}, {$set: {productId: productId}}, function (err, r) {
                assert.equal(null, err);
                console.log("Tag is updated with product id");
                collection.findOne({_id: tagId}, (e, r) => {
                    callback(r)
                });
            }
        );
    });
};


var addToCart = function (tagId, cartId, callback) {
    db.execute((db) => {
        var collection = db.collection('tags');
        collection.update({_id: tagId}, {$set: {cartId: cartId}}, function (err, r) {
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
        collection.update({_id: tagId, cartId: cartId}, {$set: {cartId: null}}, function (err, r) {
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
                        value: products.map(a => a.product.price).reduce((a, b) => a + b, 0),
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
        collection.findOne({_id: tagId}, function (err, r) {
                assert.equal(null, err);
                require('./cart').get(r.cartId, (cart) => callback(cart.status == 'paid'))
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