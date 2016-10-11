var express = require('express');
var router = express.Router();
var lodash = require('lodash-node');



 // Routes
router.get('/', function(req, res) {

 var userAccount = lodash.pick(
    req.local.user.account,
    ['messages_remaining']
  )

  res.render('private/dashboard/account/index', {output: userAccount});
});

// Exports
module.exports = router;