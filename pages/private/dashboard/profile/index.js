var express = require('express');
var router = express.Router();


 // Routes
router.get('/', function(req, res) {
  res.render('private/dashboard/profile/index');
});

// Exports
module.exports = router;