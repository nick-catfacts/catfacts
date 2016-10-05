var express = require('express');
var router = express.Router();
var lodash = require('lodash-node');



 // Routes
router.get('/', function(req, res) {

  var output = {stuff: "stuff"}
  res.render('private/dashboard/dashboard/index', {output: output});
});

// Exports
module.exports = router;