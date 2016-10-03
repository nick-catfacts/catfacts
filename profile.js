var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var express = require('express');
var extend = require('xtend');
var forms = require('forms');

var collectFormErrors = require('express-stormpath/lib/helpers').collectFormErrors;

// Declare the schema of our form:

var profileForm = forms.create({
  givenName: forms.fields.string({
    required: true
  }),
  surname: forms.fields.string({ required: true }),
  streetAddress: forms.fields.string(),
  city: forms.fields.string(),
  state: forms.fields.string(),
  zip: forms.fields.string()
});

// A render function that will render our form and
// provide the values of the fields, as well
// as any situation-specific locals

function renderForm(req,res,locals){
  res.render('profile', extend({
    title: 'My Profile',
    csrfToken: req.csrfToken(),
    givenName: req.user.givenName,
    surname: req.user.surname,
    streetAddress: req.user.customData.streetAddress,
    city: req.user.customData.city,
    state: req.user.customData.state,
    zip: req.user.customData.zip
  },locals||{}));
}