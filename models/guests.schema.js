const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuestsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('guests', GuestsSchema);