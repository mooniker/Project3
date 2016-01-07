var passport     = require('passport');
var SponsorModel = require('../models/sponsor');

module.exports = {
  getSignup: function(request, response) {
    response.render('signup', { message: request.flash('signupMessage') } );
  },
  postSignup: function(request, response) {
    var signupStrategy = passport.authenticate('local-signup', {
      successRedirect : '/profile',
      failureRedirect : '/signup',
      failureFlash : true
    });
    return signupStrategy(request, response);
  },
  getLogin: function(request, response) {
    response.render('login', { message: request.flash('loginMessage') });
  },
  postLogin: function(request, response) {
    var loginProperty = passport.authenticate('local-login', {
      successRedirect : '/',
      failureRedirect : '/login',
      failureFlash : true
    });
    return loginProperty(request, response);
  },
  getLogout(request, response) {
    request.logout();
    response.redirect('/');
  },
  getProfile(request, response) {
    // console.log('===============> getProfile');
    console.log('currentUser.username:', currentUser.username);
    response.render('profile');
  },
  postProfile(request, response) {
    // console.log('===============> postProfile');
    var username = request.body.username;
    SponsorModel.findOne( { 'local.email' : currentUser.local.email }, function(couldntFindUserByEmailError, user) {
      if (couldntFindUserByEmailError) {
        console.error('couldntFindUserByEmailError:', couldntFindUserByEmailError);
      } else {
        console.log(user);
        user.username = username;
        user.save( function(userUsernameNotSavedError) {
          if (userUsernameNotSavedError) {
            console.error('userUsernameNotSavedError:', userUsernameNotSavedError);
          } else {
            response.redirect('/profile');
          }
        } );
        // response.send('check console');
      }
    } );
    // currentUser.username = username;
    // console.log('req.body.username:', username, 'currentUser.username:', currentUser.username, currentUser);
    // console.log('postProfile req.body:', request.body, 'req.params:', request.params);
    // response.send('postProfiled!');
    // response.redirect('/profile');
  },
  getTeamDir(request, response) {
    SponsorModel.find( {}, function(couldntGetAllUsersError, users) {
      if (couldntGetAllUsersError) {
        console.error('couldntGetAllUsersError:', couldntGetAllUsersError);
      } else {
        response.render('team', { users : users } );
      }
    } );
  }
};
