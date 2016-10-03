'use strict';

var express = require('express');

// Globals
var router = express.Router();

// Routes
router.get('/', function(req, res) {
  res.render('public/index');
});

router.get('/pricing', function(req, res) {
  res.render('public/pricing');
});

router.get('/docs', function(req, res) {
  res.render('public/docs');
});

// Exports
module.exports = router;