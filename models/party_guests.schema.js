const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartyGuests = new Schema({
  party_id: {
    type: Schema.ObjectId,
    required: true
  },
  guests_email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('party_guests', PartyGuests);