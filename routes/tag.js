var express = require('express');
var router = express.Router();
var tag = require('../models/tag');

router.post('/', function (req, res) {
    tag.create((data) => res.json(data))
});

module.exports = router;
