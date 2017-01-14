var db = require('../db/db');
var assert = require('assert');
const uuidV4 = require('uuid/v4');

var create = function (productName, price, callback) {
    db.execute((db) => {
        var collection = db.collection('products');
        collection.insertOne({_id: uuidV4(), name: productName, price: price}, function (err, r) {
                assert.equal(null, err);
                console.log("product is created");
                callback(r.ops[0])
            }
        );
    });
};

var getAll = function (productTagMap, callback) {
    db.execute((db) => {
        var collection = db.collection('products');
        collection.find({
            _id: {
                $in: productTagMap.map((r) => r.productId)
            }
        }).toArray(function (err, products) {
                assert.equal(null, err);
                var productDetails = productTagMap.map(pt => {
                    var product = products.find(p => p._id === pt.productId);
                    return {
                        tagId: pt.tagId,
                        productId: product._id,
                        name: product.name,
                        price: product.price
                    };
                });
                callback(productDetails)
            }
        );
    });
};

module.exports = {
    create: create,
    getAll: getAll
};
