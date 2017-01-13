var db = require('./db');

var init = function () {
    db.execute(createUsers)
};

var createUsers = function (db) {
    db.createCollection("users",
        {
            'validator': {
                '$or': [
                    {'name': {'$type': "string"}},
                    {'email': {'$regex': /\.*\.com$/}}
                ]
            }
        },
        function (err, results) {
            console.log(" users Collection created.");
        }
    );
};

module.exports = {
    init: init
};