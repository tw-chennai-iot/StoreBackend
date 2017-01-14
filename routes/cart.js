var express = require('express');
var router = express.Router();
var cart = require('../models/cart');
var tag = require('../models/tag');

router.post('/', function (req, res) {
    cart.create((data) => res.json(data))
});

router.post('/:cartId', function (req, res) {
    tag.addToCart(req.body.tagId, req.params.cartId, () => cart.getDetails(req.params.cartId, (data) => res.json(data)));

});

router.delete('/:cartId', function (req, res) {
    tag.deleteFromCart(req.body.tagId, req.params.cartId, () => cart.getDetails(req.params.cartId, (data) => res.json(data)));

});

module.exports = router;