var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  res.send("App is running");
});

module.exports = router;
