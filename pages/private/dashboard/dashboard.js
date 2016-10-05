var express = require('express');
var router = express.Router();


var profile_locals = function(req, res, next){
  res.locals.sidebar_selected = 'header';
  next();
}
router.use(profile_locals);


// Routes
var index = require('./dashboard/index');
router.use('/', index );

// var add = require('./account/add');
// router.use('/add', add)

// Exports
module.exports = router;
