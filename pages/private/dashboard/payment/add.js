var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


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

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res) {
  res.render('private/dashboard/payment/add');
});


router.post('/', function(req, res) {
  // this add the payments
  //  res.locals.stripe_customer.sources.create(req.body.stripeToken, function

  stripe.customers.createSource(
    req.user.customData.stripe_id,
    {source: req.body.stripeToken},
    function(err, card) {
      if(err) console.log(err);
      console.log(card)
      res.redirect('private/dashboard/payment/add')
    }
  );
});


// Exports
module.exports = router;