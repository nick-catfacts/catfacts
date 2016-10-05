var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var express = require('express');
var extend = require('xtend');
var router = express.Router();
var expressValidator = require('express-validator')


//body parser-
// gets the form fields from the raw http request and populates req.body with them
router.use(bodyParser.urlencoded({ extended: true }));
router.use( expressValidator() ); // this line must be immediately after express.bodyParser()!

// // csrf security
// router.use(cookieParser());
// router.use(csurf({ cookie: true }));




router.post('/', function(req, res){
  // req.checkBody('givenName', 'Failed server validation: givenName is required!!').notEmpty();
  // req.checkBody('surname', 'Failed server validation: surname is required!!').notEmpty();

  // var errors = req.validationErrors();

  // if (errors) {
  //   console.log(errors);
  // }
  var recipient_name = req.body.recipient_first_name + " " + req.body.recipient_last_name;
  var recipient_phone = req.body.recipient_phone;

  req.user.customData.recipients[recipient_name] = recipient_phone;
  req.user.customData.save();

  req.user.save(function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Recipient Saved Successfully");
      console.log(req.user.customData);
    }
    res.redirect('back');
  });
}); //end



// Exports
module.exports = router;