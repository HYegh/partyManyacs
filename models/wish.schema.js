const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean
  },
  user_id: {
    type: Schema.ObjectId,
    required: true
  },
  user_wish_id: {
    type: Schema.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Wishes', WishSchema);