/// List of all private pages requiring loging.

'use strict';

var express = require('express');
var router = express.Router();

//profile page
var profile_page = require('./dashboard/profile');
router.use('/', profile_page)
router.use('/profile', profile_page);

//subscription page
var subscription_page = require('./dashboard/subscription');
router.use('/subscription', subscription_page);


//payment page
var payment_page = require('./dashboard/payment');
router.use('/payment', payment_page);


// Exports
module.exports = router;