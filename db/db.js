var MongoClient = require('mongodb').MongoClient;


var execute = function (command) {
    var url = 'mongodb://localhost:27017/store';

    MongoClient.connect(url, function (err, db) {
        // assert.equal(null, err);
        console.log("connection established");
        command(db);
    });

};

module.exports = {
    execute: execute
};