var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.post('/', function (req, res) {
    user.create(req.body.name, req.body.emailId, (data) => res.json(data) )
});

module.exports = router;
