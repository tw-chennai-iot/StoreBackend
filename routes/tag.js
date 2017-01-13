var express = require('express');
var router = express.Router();
var tag = require('../models/tag');

router.post('/', function (req, res) {
    tag.create((data) => res.json(data))
});

router.post('/:tagId/associate', function (req, res) {
    tag.update(req.params.tagId, req.body.productId, (data) => res.json(data))
});

module.exports = router;
