var express = require('express');
var router = express.Router();



// Middleware

var profile_locals = function(req, res, next){
  res.locals.sidebar_selected = 'profile';
  next();
}

router.use(profile_locals);

// Routes
var index = require('./profile/index');
router.use('/', index );

var edit = require('./profile/edit');
router.use('/edit', edit)

// Exports
module.exports = router;