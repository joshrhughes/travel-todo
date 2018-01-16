var passport = require("passport");
var db = require('../models');

// GET /signup
function getSignup(request, response, next) {
    response.render('signup.ejs', {message: request.flash('signupMessage') });
}

// POST /signup
function postSignup(request, response, next) {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/auth',
    failureRedirect: '/signup',
    failureFlash: true
  });

  return signupStrategy(request, response, next);
}

// GET /login
function getLogin(request, response, next) { 
  response.render('login.ejs', { message: request.flash('loginMessage') });
}

// POST /login 
function postLogin(request, response, next) {
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect: '/auth',
    failureRedirect: '/login',
    failureFlash: true
  });

  return loginStrategy(request, response, next);
}

// GET /logout
function getLogout(request, response, next) {
  request.logout();
  response.redirect('/');
}

// POST /places
function postPlaces(request, response){
  console.log('body', request);
  db.Place.create({
    userEmail: request.user.local.email,
    locName: request.body.place
    
  });
  response.json(request.body.place);
}



// Restricted page
function auth(request, response){
  response.render('auth');
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  postPlaces: postPlaces,
  auth: auth
};