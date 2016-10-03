app.use(function (req, res, next) {


  if(false){
    res.locals.loggedin = true;
    //res.locals.currentuser = req.user;
  }
  else{
    res.locals.loggedin = false;
  };
  next();
});