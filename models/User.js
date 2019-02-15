const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Shema
const UserSchema = new Schema({
  ClientId:{
    type:String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  fullName: {
    type: String
  },
  phoneNumber : {
    type: String
  },
  image: {
    type:String
  },
  token: {
    type:String,
    required: true
  }
});

// Create collection and add schema
mongoose.model('users', UserSchema);