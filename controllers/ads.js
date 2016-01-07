var passport = require('passport');
var AdModel  = require('../models/ad');

var helpers = {
  saveNewAd: function( adObject ) {
    var newAd = new AdModel( adObject );
    newAd.save( function(error) {
      if (error) {
        console.error('FailedToSaveNewAdError:', error); // shout if something goes wrong
        return false;
      } else {
        console.log('Ad saved.');
        return true;
      }
    } );
  }
};

module.exports = {
  index: function(request, response) {
    AdModel.find( { client_id: currentUser._id }, function(error, docs) {
      if (error) {
        console.log('failedToGetAdsError:', error);
      } else {
        response.render('advertising/index', { ads : docs } );
        // response.json(docs);
      }
    } );
  },
  show: function(request, response) {
    //
  },
  create: function(request, response) {
    var adName = request.body.ad_name;
    var adText = request.body.ad_text;
    var clientId = currentUser._id;
    helpers.saveNewAd({
      name: adName,
      text: adText,
      client_id: clientId,
    });
    response.redirect('/advertising');
  },
  update: function(request, response) {
    //
  },
  delete: function(request, response) {
    AdModel.remove( {_id: request.params.id}, function(AdNotDeletedError) {
      if (AdNotDeletedError) {
        console.error('AdNotDeletedError:', AdNotDeletedError);
      } else {
        response.redirect('/advertising');
      }
    } );
  }
};
