var express = require('express');
var router = express.Router();
var lodash = require('lodash-node');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var bodyParser = require('body-parser');
var async = require('async');
var nick_ecom = require('nick_ecommerce');



router.use(bodyParser.urlencoded({ extended: true }));



 // Routes
router.post('/', function(req, res) {

  async.series([
      function(callback){
        charge_stripe_customer(
            req.body.charge_amt,
            req.local.user.service_id.stripe,
            callback
        )
      },
      function(callback){
          var amount = dollars_to_messages(req.body.charge_amt);
          nick_ecom.add_messages(req.local.user.username, amount,
            function(err, user){
              if(err) {
                return callback(err);
              } else{
                console.log("Messages added to User in database.")
                console.log(user)
                return callback()
              }
            }
          );
        }
      ],
      function(err) { //This is the final callback
          if(err) {
            return console.log( err );
          }
            else{
            console.log('Final Callback!! Messages added successfully!!!');
            res.redirect('/dashboard/account');
          }

      });
});


var charge_stripe_customer = function(amount, customer_id, callback){
  // guard against single charges above 20 bucks.
  if (amount > 2000){ amount = 2000};

  stripe.charges.create({
    amount: amount,
    currency: "usd",
    customer: customer_id,
    description: "Charge for Catfacts. Thank you meow."
    }, function(err, charge) {
      // asynchronously called
      if (err) return callback(err);
      console.log('Charge Successful!');
      console.log(charge);
      callback();
    });
};

var add_messages = function(account, num_msg_to_add, callback){
    account.customData.totalMessagesRemaining += num_msg_to_add;
    account.customData.save(function(err) {
      console.log('Messages Increased!!');
      if (err) return callback(err);
      callback();
    });
};



var dollars_to_messages = function(dollars){
  var msgs = (dollars / process.env.COST_PER_MESSAGE);
  console.log("Num msges to add:" + msgs);
  return msgs;
}

// Exports
module.exports = router;