var express = require('express');
var router = express.Router();
var lodash = require('lodash-node');



 // Routes
router.get('/', function(req, res) {


  var output = req.user.customData.recipients;

  res.render('private/dashboard/recipients/index', {output: output});
});

// Exports
module.exports = router;