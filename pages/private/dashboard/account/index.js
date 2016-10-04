var express = require('express');
var router = express.Router();
var lodash = require('lodash-node');



 // Routes
router.get('/', function(req, res) {

 res.locals.userAccount = lodash.pick(
    req.user.customData,
    ['totalMessagesRemaining']
  )

  res.render('private/dashboard/account/index');
});

// Exports
module.exports = router;