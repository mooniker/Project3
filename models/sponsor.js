var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Sponsor = mongoose.Schema({
  local : {
    email     : String,
    password  : String,
    createdAt : { type: Date, default: Date.now }
  }
});

Sponsor.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

Sponsor.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('Sponsor', Sponsor);
