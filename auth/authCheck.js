function checkAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/login');
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
  checkGuest
}
