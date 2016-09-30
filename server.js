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
app.use('/vendor/js',    express.static('node_modules/jquery/dist')); // redirect JS jQuery
app.use('/vendor/js',    express.static('node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/vendor/css',   express.static('node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/vendor/css',   express.static('node_modules/font-awesome/css')); // redirect CSS bootstrap
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