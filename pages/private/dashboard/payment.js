var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var express = require('express');
var extend = require('xtend');
var forms = require('forms');
var stormpath = require('express-stormpath');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


var router = express.Router();


 // Routes
router.get('/', function(req, res) {
  res.locals.sidebar_selected = 'payment';
  res.render('private/dashboard/payment/index');
});


 // Routes
router.all('/edit', function(req, res) {
  // handle form manipulation here
});



// Exports
module.exports = router;