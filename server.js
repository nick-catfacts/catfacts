var express = require('express');
var stormpath = require('express-stormpath');
var expressLayouts = require('express-ejs-layouts');

var app = express();

// view related setup
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');


// static asset frontend setup
app.use('/vendor/jquery',    express.static('node_modules/jquery/dist')); // redirect JS jQuery
app.use('/vendor/bootstrap',    express.static('node_modules/bootstrap/dist')); // redirect bootstrap JS
app.use('/vendor/font-awesome',   express.static('node_modules/font-awesome')); // redirect CSS bootstrap
app.use(express.static('public'));

// stormpath init
app.use(stormpath.init(app, {
  expand: {
    customData: true
  }
}));

// routes
app.get('/', stormpath.getUser, function(req, res) {
  res.render('home', {
    title: 'Welcome',
  });
});


//start up stuff
app.on('stormpath.ready',function(){
  console.log('Stormpath Ready');
});


app.listen(3000);