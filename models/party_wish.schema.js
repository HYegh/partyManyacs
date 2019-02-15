const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartyWishes = new Schema({
  party_id: {
    type: Schema.ObjectId,
    required: true
  },
  wish_id: {
    type: Schema.ObjectId,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  },
  selectedUser: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('party_wish', PartyWishes);