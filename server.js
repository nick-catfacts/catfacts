'use strict';


// start app
var express = require('express');
var app = express();
var stormpath = require('express-stormpath');
var twilio = require('twilio');
var express_layouts = require('express-ejs-layouts');
var path = require('path');
var http = require('http');
var nick_ecom = require('nick_ecommerce');

//ENV variables
app.locals.config = require('./config');;

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
    nick_ecom.create_customer(
      req.user.name,
    );
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

