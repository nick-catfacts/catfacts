'use strict';

var async = require('async');
var express = require('express');
var stormpath = require('express-stormpath');
var stripe = require('stripe');
var twilio = require('twilio');
var express_layouts = require('express-ejs-layouts');
var path = require('path');


// start app
var app = express();



//ENV variables
app.locals.config = require('./config');

// Node allows requiring of json and automatically parses!!!!
// Not used in the app, Just here to remind me about it because it's cool.
app.locals.json_parse_test = require('./config.json');

// view related setup
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express_layouts);
app.set('layout', 'layouts/layout');

// static asset frontend setup
app.use('/vendor/jquery',    express.static('node_modules/jquery/dist')); // redirect JS jQuery
app.use('/vendor/bootstrap',    express.static('node_modules/bootstrap/dist')); // redirect bootstrap JS
app.use('/vendor/font-awesome',   express.static('node_modules/font-awesome')); // redirect CSS bootstrap
app.use('/vendor/bootstrap-validator',   express.static('node_modules/bootstrap-validator/dist')); // redirect CSS bootstrap

app.use(express.static('assets'));

// stormpath init
app.use(stormpath.init(app, {
  expand: {
    customData: true
  },
   web: {
    login: {
      view: 'views/auth/login.jade', // My custom login view
      nextUri: '/dashboard' // this is uri that is visited on successful login
    }
  }
}));



// get response locals here available to views
app.get('*', stormpath.getUser, function(req, res, next) {
  // set user related variables
    if (typeof res.locals.user === 'undefined') {
      res.locals.user = 'false'
    }
    else {
      res.locals.user.is_login = true
    }
  next()
});



// Routes
//=========================
// Note: Theres several implicit routes defined by Stormpath for user auth
// https://docs.stormpath.com/nodejs/express/latest/configuration.html


// public routes
var publicRoutes = require('./pages/public/public');
app.use('/', publicRoutes);

//dashboard
var private_pages = require('./pages/private/private');


app.use('/dashboard', stormpath.loginRequired, private_pages);


app.get('/test', function(req, res) {
  res.render('public/test');
});



//start up stuff
app.on('stormpath.ready',function(){
  console.log('Stormpath Ready');
});


app.listen(3000);

