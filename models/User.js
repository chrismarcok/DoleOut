const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: ""
  },
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  avatarURL: {
    type: String,
    default: ""
  },
  paypalURL: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  preference: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

mongoose.model('users', UserSchema);