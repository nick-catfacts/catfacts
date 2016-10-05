'use strict';


// start app
var express = require('express');
var app = express();
var async = require('async');
var stormpath = require('express-stormpath');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var twilio = require('twilio');
var express_layouts = require('express-ejs-layouts');
var path = require('path');

//ENV variables
app.locals.config = require('./config');;

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


// lining up tasks for async.
var create_new_stripe_customer = function(account, callback){
  stripe.customers.create({
      description: "Account for " + account.email
    },
    function(err, customer) {
      // asynchronously called upon completion
      //console.log(err);
      account.customData.stripe_id = customer.id;
      console.log(customer);
      if (err) return callback(err);
      callback();
  });
};

var save_new_stormpath_account = function(account, callback){
    account.customData.balance = 0;
    account.customData.totalMessagesUsed = 0;
    account.customData.totalMessagesRemaining = 0;
    account.customData.recipients={};
    account.customData.save(function(err) {
      if (err) return callback(err);
      callback();
    });
};

// stormpath init
app.use(stormpath.init(app, {
  apiKey: {
    id: process.env.STORMPATH_CLIENT_APIKEY_ID,
    secret: process.env.STORMPATH_CLIENT_APIKEY_SECRET
  },
  application: {
    href: process.env.STORMPATH_APPLICATION_HREF
  },
  expand: {
    customData: true
  },
   web: {
    login: {
      view: 'views/auth/login.jade', // My custom login view
      nextUri: '/dashboard' // this is uri that is visited on successful login
    }
  },
  postLoginHandler: function(account, req, res, next) {

    async.series([
      function(callback){
          create_new_stripe_customer(account, callback)
        },
      function(callback){
          save_new_stormpath_account(account, callback)
        }
      ],
      function(err) { //This is the final callback
          if(err) console.log( err );
          console.log(account);
          console.log('Final Callback!!');
      });

    next();
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
  console.log('This is a test page!');
  res.render('public/test');
});



//start up stuff
app.on('stormpath.ready',function(){
  console.log('Stormpath Ready');
});


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


http.createServer(app).listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});

