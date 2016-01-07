var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var passport       = require('passport');
var flash          = require('connect-flash');
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var LocalStrategy  = require('passport-local').Strategy;
var bcrypt         = require('bcrypt-nodejs');
var mongoose       = require('mongoose');
var path           = require('path');

var env; // configuration variables
try { // check if local env.js exists for dev server
  env = require('./env');
} catch (localEnvJsNotPresentException) {
  // otherwise use production server's config vars
  env = process.env;
}

var server = express();
server.set('view engine', 'jade');

server.use( bodyParser.json() );
server.use( bodyParser.urlencoded({ extended:true }) );
server.use( methodOverride('_method') ); // allows put/delete request in html form
server.use( express.static( path.join(__dirname, 'public') ) );

server.use( morgan('dev') );
server.use( cookieParser() );

server.use( session({ secret: 'bimilbimil'}) );
server.use( passport.initialize() );
server.use( passport.session() );
server.use( flash() );

require('./config/passport')(passport);

server.use( function(request, response, next) {
  global.currentUser = request.user;
  response.locals.currentUser = request.user;
  next();
} );

var SponsorModel = require('./models/sponsor');
var sponsors = require('./controllers/sponsors');
var ads = require('./controllers/ads');

var dbConnection = mongoose.connect(env.MONGO_SERVER_URI);

server.get( '/', function(request, response) {
  response.json({
    'message': 'Hello, world!'
  });
} );

var helpers = {
  authenticatedSponsor: function(request, response, next) {
    if ( request.isAuthenticated() ) {
      return next();
    } else {
      // response.redirect('/login');
      response.render('advertising/welcome');
    }
  }
};

server.route('/advertising/signup')
  .get(sponsors.getSignup)
  .post(sponsors.postSignup);

server.route('/advertising/login')
  .get(sponsors.getLogin)
  .post(sponsors.postLogin);

server.route('/advertising/logout')
  .get(sponsors.getLogout);

server.route('/advertising/ads/:id')
  .get(helpers.authenticatedSponsor, ads.show)
  .put(helpers.authenticatedSponsor, ads.update)
  .delete(helpers.authenticatedSponsor, ads.delete);

server.route('/advertising/ads')
  .post(helpers.authenticatedSponsor, ads.create);

server.route('/advertising')
  .get(helpers.authenticatedSponsor, ads.index);

server.route('/advertising/account')
  .get(helpers.authenticatedSponsor, sponsors.getAccount);

server.listen( env.PORT, function () {
  console.log('Server listens on port', env.PORT + '.');
} );

// _) * |\/|()()|\| //
