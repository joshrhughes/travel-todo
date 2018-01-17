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

// GET /places

function getPlaces(request, response){
  //console.log('things', request);
  //console.log("Stuff is going here"+request.body);
  //only lists the current user's places
  db.Place.find({userEmail: request.user.local.email}, function(err,places){ //complete: null
    response.json(places);
  });
}

// POST /places
function postPlaces(request, response){
 // console.log('body', request);
  db.Place.create({
    userEmail: request.user.local.email,
    locName: request.body.place,
    complete: request.body.beenThere,
    //number: 
  },function(err, places){
    response.json(places);
  });
}

//GET /placesId
function getPlacesId (request,response){
  db.Place.find({ userEmail: request.user.local.email , _id: request.params.id }, function (err, places) {
    response.json(places);
  });
}

//PUT /placesId
function putPlacesId (request, response){
  db.Place.update({  _id: request.params.id }, {
    //locName: request.body.place,
    complete: true
    //complete: request.body.beenThere
  } ,function(err, updated){
    response.json(updated);
  });
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
  getPlaces: getPlaces,
  postPlaces: postPlaces,
  getPlacesId: getPlacesId,
  putPlacesId: putPlacesId,
  auth: auth
};