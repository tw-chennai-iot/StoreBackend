var db = require('./db');

var collections = [{
    name: 'users',
    validator: {
        '$or': [
            {'name': {'$type': "string"}},
            {'email': {'$regex': /\.*\.com$/}}
        ]
    }
}, {
    name: 'tags',
    validator: {
        '$or': [
            {'productId': {'$type': "uuid"}},
            {'cartId': {'$type': "double"}}
        ]
    }
}, {
    name: 'products',
    validator: {
        '$or': [
            {'name': {'$type': "string"}},
            {'price': {'$type': "number"}}
        ]
    }
}, {
    name: "carts",
    validator: {
        '$or': [
            {'status': {'$type': "string"}}
        ]
    }
}];

var init = function () {
    db.execute((db) => {
        collections.forEach(c => create(c, db));
    });
};

var create = function (c, db) {
    db.createCollection(c.name,
        {
            'validator': c.validator
        },
        (err, results) => {
            console.log(c.name, " Collection created.");
        }
    );
};

module.exports = {
    init: init
};