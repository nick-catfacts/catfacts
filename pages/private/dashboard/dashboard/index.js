var express = require('express');
var router = express.Router();
var lodash = require('lodash-node');



 // Routes
router.get('/', function(req, res) {

  var username = req.local.user.username;
  var recipients = [];



  (function() {
    recipients = process_recipients.call(this, req);
  })();

  var messages_remaining = lodash.pick(
    req.local.user.account,
    ['messages_remaining']
  )

  res.render('private/dashboard/dashboard/index', {
    recipients: recipients,
    username:username,
    messages_remaining:messages_remaining,
    payment_info:payment_info
    });
});




var process_recipients = function(req){

  var raw_recipients = req.local.user.recipients.toObject();
  var processed_recipients = [];
  var subset = {}

  for (var i = 0; i < raw_recipients.length; i++) {
     subset = lodash.pick(
      raw_recipients[i],
      ['name', 'phone','interval']
    )
    processed_recipients.push(subset)
  }

  return processed_recipients;
}

// Exports
module.exports = router;