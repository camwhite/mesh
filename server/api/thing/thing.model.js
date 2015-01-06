'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  info: String,
  contributors: Array,
  active: Boolean,
  username: String,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  messages: Array
});

module.exports = mongoose.model('Thing', ThingSchema);
