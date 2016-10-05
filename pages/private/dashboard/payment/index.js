var express = require('express');
var router = express.Router();
var lodash = require('lodash-node');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// minimize this to one api call.
router.use( function(req,res,next){
  stripe.customers.retrieve(
    req.user.customData.stripe_id,
    function(err, customer) {
      if(err) console.log(err);
      res.locals.stripe_customer = customer;
      next();
    }
  );
});

router.use( function(req,res,next){
  stripe.customers.retrieveCard(
    res.locals.stripe_customer.id,
    res.locals.stripe_customer.default_source,
    function(err, card) {
      if(err) console.log(err);
      console.log(res.locals.stripe_customer.id);
      console.log(res.locals.stripe_customer.default_source);
      res.locals.default_card = card;
      next();
    }
  );
});

 // Routes
router.get('/', function(req, res) {

    var card_info = lodash.pick(
      res.locals.default_card,
      ['brand', 'country', 'exp_month', 'exp_year', 'last4']
    );

    res.render('private/dashboard/payment/index', {output: card_info});
});
// Exports
module.exports = router;