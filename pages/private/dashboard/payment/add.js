var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    }
  );
});


// Exports
module.exports = router;