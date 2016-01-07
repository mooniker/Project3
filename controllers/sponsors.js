var passport     = require('passport');
var SponsorModel = require('../models/sponsor');
var AdModel      = require('../models/ad');

module.exports = {
  getSignup: function(request, response) {
    response.render('advertising/signup', { message: request.flash('signupMessage') } );
  },
  postSignup: function(request, response) {
    var signupStrategy = passport.authenticate('local-signup', {
      successRedirect : '/advertising/account',
      failureRedirect : '/advertising/signup',
      failureFlash : true
    });
    return signupStrategy(request, response);
  },
  getLogin: function(request, response) {
    response.render('advertising/login', { message: request.flash('loginMessage') });
  },
  postLogin: function(request, response) {
    var loginProperty = passport.authenticate('local-login', {
      successRedirect : '/advertising',
      failureRedirect : '/advertising/login',
      failureFlash : true
    });
    return loginProperty(request, response);
  },
  getLogout(request, response) {
    request.logout();
    response.redirect('/'); // FIXME when you figure out what to do
  },
  getAccount(request, response) {
    console.log('currentUser.username:', currentUser.username);
    AdModel.find( {}, function(failedToGetAdsError, docs) {
      if (failedToGetAdsError) {
        console.error('failedToGetAdsError:', failedToGetAdsError);
      } else {
        response.render('advertising/account', { ads: docs });
      }
    } );
  },
  postAccount(request, response) {
    // var username = request.body.username;
    SponsorModel.findOne( { 'local.email' : currentUser.local.email }, function(couldntFindUserByEmailError, sponsor) {
      if (couldntFindUserByEmailError) {
        console.error('couldntFindUserByEmailError:', couldntFindUserByEmailError);
      } else {
        console.log(sponsor);
        sponsor.save( function(userUsernameNotSavedError) {
          if (userUsernameNotSavedError) {
            console.error('userUsernameNotSavedError:', userUsernameNotSavedError);
          } else {
            response.redirect('/advertising/account');
          }
        } );
      }
    } );
  }
};
