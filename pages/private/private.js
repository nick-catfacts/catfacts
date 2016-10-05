/// List of all private pages(login required).

'use strict';

var express = require('express');
var router = express.Router();
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var lodash = require('lodash-node');


// set these objects to be available to all views
// note: The stormpath object is already been populated on the req object
router.use( function(req, res, next){
  res.locals.deCamelCaser = function(string){
    var result = string.replace( /([A-Z])/g, " $1" );
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  next();
});


// dashboard page
var dashboard_page = require('./dashboard/dashboard');
router.use('/', dashboard_page)

// recipients page
var recipients_page = require('./dashboard/recipients');
router.use('/recipients', recipients_page)


//profile page
var profile_page = require('./dashboard/profile');
router.use('/profile', profile_page);

//account page
var account_page = require('./dashboard/account');
router.use('/account', account_page);


//payment page
var payment_page = require('./dashboard/payment');
router.use('/payment', payment_page);


// Exports
module.exports = router;