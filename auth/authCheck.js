function checkAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/login');
  }
}

function checkAdmin(req, res, next){
  if (req.user.isAdmin){
    return next();
  } else {
    res.redirect("/");
  }
}

function checkGuest(req, res, next){
  if (!req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/');
  }
}

module.exports =  {
  checkAuthenticated,
  checkGuest,
  checkAdmin
}
