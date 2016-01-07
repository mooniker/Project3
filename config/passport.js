var LocalStrategy = require('passport-local').Strategy;
var SponsorModel  = require('../models/sponsor');

module.exports = function(passport) {
  passport.serializeUser( function(user, done) {
    done(null, user.id);
  } );

  passport.deserializeUser( function(id, callback) {
    SponsorModel.findById( id, function(error, user) {
      callback(error, user);
    } );
  } );

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(request, email, password, callback) {
    // Find a user by given email address
    SponsorModel.findOne({ 'local.email' : email }, function(error, user) {
      if (error) {
        console.error('couldntFindUserByEmailError:', error);
        return callback(error);
      } else if (user) {
        return callback(null, false, request.flash('signupMessage', 'This email is already used.'));
      } else { // all clear, create new user
        var newUser = new SponsorModel();
        newUser.local.email = email;
        // newUser.local.username = username;
        newUser.local.password = newUser.encrypt(password);

        newUser.save( function(newUserSaveError) {
          if (newUserSaveError) {
            console.error('newUserSaveError:', newUserSaveError);
            throw newUserSaveError;
          } else {
            return callback(null, newUser);
          }
        } );
      }
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback: true
  }, function(request, email, password, callback) {
    // search for user with this email
    SponsorModel.findOne({ 'local.email' : email }, function(userNotFoundError, user) {
      if (userNotFoundError) {
        console.error('userNotFoundError:', userNotFoundError);
        return callback(userNotFoundError);
      } else if (!user) { // if no user found
        return callback(null, false, request.flash('loginMeetup', 'User not found.'));
      }
      return callback(null, user);
    } );
  } ) );
};
