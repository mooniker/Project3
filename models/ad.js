var mongoose = require('mongoose');
var AdSchema = require('../schema');

module.exports = mongoose.model('Ad', AdSchema);
