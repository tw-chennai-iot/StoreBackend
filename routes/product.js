var express = require('express');
var router = express.Router();
var product = require('../models/product');

router.post('/', function (req, res) {
    product.create(req.body.name,req.body.price, (data) => res.json(data))
});

module.exports = router;
