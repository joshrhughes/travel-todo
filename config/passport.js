var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport){

    passport.serializeUser(function(user, callback){
        callback(null, user.id);
    });

    passport.deserializeUser(function(id, callback){
        User.findById(id, function(err, user){
            callback(err,user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, function (req, email, password, callback) {
        var nameFirst = req.body.nameFirst;
        //checking to see if the user already has an account with a given username
        User.findOne({'local.email' : email}, function(err, user){
            if (err) return callback (err);
                //If email is already in use
            if (user){
                return callback(null, false, req.flash('signupMessage', "This email is already used."));
            } else{
                //There's no document in the DB with this email, so we're going make one
                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.encrypt(password);
                newUser.local.nameFirst = nameFirst;
            
                newUser.save(function(err){
                    if (err) throw err;
                    return callback(null, newUser);
                });
            }
        });
    }));

    //// Sign IN
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, callback) {
        // Search for a user with this email
        User.findOne({ 'local.email': email }, function (err, user) {
            if (err) {
                return callback(err);
            }

            // If no user is found
            if (!user) {
                return callback(null, false, req.flash('loginMessage', 'No user found.'));
            }
            // Wrong password
            if (!user.validPassword(password)) {
                return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }

            return callback(null, user);
        });
    }));
    ///
};