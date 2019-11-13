const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName:{
    type:String,
    required: true
  },
  password:{
    type:String,
    required: true
  },
  email:{
    type: String,
  },
  firstName:{
    type:String,
  },
  lastName:{
    type:String,
  },
  avatarURL:{
    type:String,
  },
  paypalURL:{
    type:String
  },
  description:{
    type:String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('users', UserSchema);