app.get('/', stormpath.getUser, function(req, res) {

  var user =  {
    name: "guest",
    is_login: false
  }
  // set variables for logged in state
  if(req.user){
      user.name = req.user.givenName,
      user.is_login = true
  }

  res.render('home', {
    user: user
  });
});
