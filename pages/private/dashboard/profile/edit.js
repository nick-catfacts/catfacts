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

// csrf security
router.use(cookieParser());
router.use(csurf({ cookie: true }));



// map form data fields to stormpath data fields
// this must match the  fields in profileForm below
var formMap = [
  { name:"first_name" , value: ""},
  { name:"last_name" , value: ""},
  { name:"street" , value: ""},
  { name:"city" , value: ""},
  { name:"state" , value: ""},
  { name: "zip", value: ""},
]


// populate a object with stormpath data,
// sp is the stormpath user object, typically res.user
var formData = function(sp){
  var formData = {
    firstName: sp.first_name,
    lastName:  sp.surname,
    streetAddress: sp.customData.streetAddress,
    city: sp.customData.city,
    state: sp.customData.state,
    zip: sp.customData.zip
  }
  return formData;
}


 // Routes
router.get('/', function(req, res) {
  // our object
  res.locals.form={};
  // this populates the name values
  res.locals.form.map = formMap;
  // this populates thedata
  res.locals.form.data=formData(req.user);
  // add the csrf token
  res.locals.csrfToken= req.csrfToken();
  //render
  res.render('private/dashboard/profile/edit');
});



//===================GET code ends here,below is POST code ===================

// error handler for CSRF
router.use(function (err, req, res, next) {
  // This handler catches errors for this router
  if (err.code === 'EBADCSRFTOKEN'){
    // The csurf library is telling us that it can't
    // find a valid token on the form
    if(req.user){
      // session token is invalid or expired.
      // render the form anyways, but tell them what happened
      renderForm(req,res,{
        errors:[{error:'Your form has expired.  Please try again.'}]
      });
    }else{
      // the user's cookies have been deleted, we dont know
      // their intention is - send them back to the home page
      res.redirect('/');
    }
  }else{
    // Let the parent app handle the error
    return next(err);
  }
});




router.post('/', function(req, res){
  req.checkBody('givenName', 'Failed server validation: givenName is required!!').notEmpty();
  req.checkBody('surname', 'Failed server validation: surname is required!!').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  }

  req.user.givenName =  req.body.givenName;
  req.user.surname = req.body.surname;
  req.user.customData.streetAddress = req.body.streetAddress;
  req.user.customData.city = req.body.city;
  req.user.customData.state = req.body.state;
  req.user.customData.zip = req.body.zip;
  req.user.customData.save();
  req.user.save(function(err){
    console.log(err);
    res.redirect('back');
  });

  //res.redirect('/dashboard/profile/edit');
}); //end router.all method



// Exports
module.exports = router;