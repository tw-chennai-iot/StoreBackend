var express = require('express');
var router = express.Router();
var tag = require('../models/tag');

router.post('/', function (req, res) {
    tag.create(req.body.tagId, (data) => res.json(data))
});

router.post('/:tagId', function (req, res) {
    tag.update(req.params.tagId, req.body.productId, (data) => res.json(data))
});

router.get('/:tagId/status', function (req, res) {
    tag.check(req.params.tagId, (data) => res.send(data ? '1' : '0' ))
});

module.exports = router;
