var express = require('express');
var env;
try {
  env = require('./env');
} catch (localEnvJsNotPresentException) {
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
