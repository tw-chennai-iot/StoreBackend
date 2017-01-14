var express = require('express');
var router = express.Router();
var tag = require('../models/tag');

router.post('/', function (req, res) {
    tag.create((data) => res.json(data))
});

router.post('/:tagId', function (req, res) {
    tag.update(req.params.tagId, req.body.productId, (data) => res.json(data))
});

router.get('/:tagId/product/:productId/status', function (req, res) {
    tag.check(req.params.tagId, req.params.productId, (data) => res.send(data))
});

module.exports = router;
