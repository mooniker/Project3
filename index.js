var express = require('express');

var env; // configuration variables
try { // check if local env.js exists for dev server
  env = require('./env');
} catch (localEnvJsNotPresentException) {
  // otherwise use production server's config vars
  env = process.env;
}

var server = express();

server.get( '/', function(request, response) {
  response.json({
    'message': 'Hello, world!'
  });
} );

server.listen( env.PORT, function () {
  console.log('Server listens on port', env.PORT + '.');
} );
