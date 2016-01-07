var mongoose = require('mongoose');

var env; // configuration variables
try { // check if local env.js exists for dev server
  env = require('./env');
} catch (localEnvJsNotPresentException) {
  // otherwise use production server's config vars
  env = process.env;
}

var AdModel = require('./models/ad');
var dbConnection = mongoose.connect(env.MONGO_SERVER_URI);

console.log('Clearing and reseeding database.');

// delete all existing ads in the database
AdModel.remove( {}, function(error) {
  if (error) {
    console.error('AdModelRemoveAll ERROR:', error); // shout if there's an error
  } else {
    console.log('All ads removed from database.');
  }
} );

var ads = [{
  name : 'Claude',
  text   : 'si vous réussissez, vous serez bientôt couverts de gloire.'
},{
  name : 'Sam',
  text   : 'What hath God wrought?'
},{
  name : 'Leonard',
  body:  'lo'
},{
  name : 'Charley',
  text   : 'login'
},{
  name : 'Ray',
  text   : 'QWERTYIOP'
}];

// helpers
var helpers = {
  // saveNewMessage: function( messageObject ) {
  //   var newMessage = new AdModel( messageObject );
  //   newMessage.save( function(error) {
  //     if (error) {
  //       console.error('newMessageSave ERROR:', error); // shout if something goes wrong
  //       return false;
  //     } else {
  //       console.log('Message saved.');
  //       return true;
  //     }
  //   } );
  // },
  saveNew: function(model, object) {
    var newThing = new model(object);
    newThing.save( function(savingError) {
      if (savingError) {
        console.error('savingError:', savingError);
        return false;
      } else {
        console.log('Thing saved.');
        return true;
      }
    } );
  }
};


for ( var a = 0; a < ads.length; a += 1 ) {
  console.log('Staging ad for "' + JSON.stringify(ads[a]) + '"');
  if ( helpers.saveNew( AdModel, ads[a]) ) {
    // awesome
    // maybe TODO put counter in here to terminate
    // when everything's loaded
  } else {
    // not awesome
  }
}
