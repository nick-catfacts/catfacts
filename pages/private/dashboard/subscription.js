var express = require('express');



var router = express.Router();


 // Routes
router.get('/', function(req, res) {
  res.locals.sidebar_selected = 'subscription'
  res.render('private/dashboard/subscription/index');
});


 // Routes
router.all('/edit', function(req, res) {

  // handle form manipulation here
});



// Exports
module.exports = router;