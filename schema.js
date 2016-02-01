var mongoose = require('mongoose');

// instantiate namespace for Mongoose's schema constructor
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

// define schema for messages
var AdSchema = new Schema({

  name: String,

  text: String,

  href: String,

  client_id : {
    type: Schema.Types.ObjectId,
    ref: 'Sponsor'
  },

  // city_id : {
  //   type : Schema.Types.ObjectId,
  //   ref : 'City'
  // },

  created_at : {
    type: Date,
    default: Date.now
  }

});

module.exports = AdSchema;
