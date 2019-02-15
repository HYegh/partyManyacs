const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  date: {
    type: String
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  time: {
    type: String
  },
  user_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('parties', PartySchema);