var express = require('express');
var router = express.Router();
var cart = require('../models/cart');

router.post('/', function (req, res) {
    cart.create((data) => res.json(data))
});

module.exports = router;
