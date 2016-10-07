var express = require('express');
var router = express.Router();
var lodash = require('lodash-node');
var nick_ecom = require('nick_ecommerce');



 // Routes
router.get('/', function(req, res) {
  var output = req.local.user.recipients.toObject();
  res.render('private/dashboard/recipients/index', { array_of_json_output: output});
});

// Exports
module.exports = router;