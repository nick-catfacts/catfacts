var express = require('express');
var router = express.Router();
var lodash = require('lodash-node');


 // Routes
router.get('/', function(req, res) {


  // pick out certain fields from the request objects
  user_info = lodash.pick(
    req.local.user,
    ['username', 'first_name', 'last_name' ]/*, 'createdAt' 'email.primary',*/
  )

  address = lodash.pick(
    req.local.user.mailing_address,
    ['street', 'city','state', 'zip']
  )

  // this combines the two arrays into one variable which is passed to the view
  output = lodash.assign(user_info, address);

  res.render('private/dashboard/profile/index', {output: output});
});

// Exports
module.exports = router;