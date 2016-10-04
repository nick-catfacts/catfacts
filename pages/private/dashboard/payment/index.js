var express = require('express');
var router = express.Router();
var lodash = require('lodash-node');

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