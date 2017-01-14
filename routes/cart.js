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

router.delete('/:cartId/tag/:tagId', function (req, res) {
    tag.deleteFromCart(req.params.tagId, req.params.cartId, () => cart.getDetails(req.params.cartId, (data) => res.json(data)));

});

router.get('/:cartId', function (req, res) {
    cart.getDetails(req.params.cartId, (data) => res.json(data));
});

router.post('/:cartId/pay', function (req, res) {
    cart.pay(req.params.cartId, () => cart.getDetails(req.params.cartId, (data) => res.json(data)));
});

module.exports = router;