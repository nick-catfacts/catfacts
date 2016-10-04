var express = require('express');
var router = express.Router();
var lodash = require('lodash-node');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));


 // Routes
router.post('/', function(req, res) {

  stripe.charges.create({
    amount: req.body.charge_amt,
    currency: "usd",
    customer: res.locals.stripe_customer.id,
    description: "Charge for Catfacts. Thank you meow."
    }, function(err, charge) {
      // asynchronously called
      console.log(charge);
      console.log('account/add post!');
      console.log(req.body);
      res.redirect('back');
    });



});

// Exports
module.exports = router;