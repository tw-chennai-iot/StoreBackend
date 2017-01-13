var db = require('./db');

var init = function () {
    db.execute((db) => {
        users(db);
        tags(db);
    });
};

var users = function (db) {
    db.createCollection("users",
        {
            'validator': {
                '$or': [
                    {'name': {'$type': "string"}},
                    {'email': {'$regex': /\.*\.com$/}}
                ]
            }
        },
        (err, results) => {
            console.log(" users Collection created.");
        }
    );
};

var tags = function (db) {
    db.createCollection("tags",
        {}, (err, results) => {
            console.log("Tags Collection created.");
        }
    );
};

module.exports = {
    init: init
};