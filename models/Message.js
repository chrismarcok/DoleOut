const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MsgSchema = new Schema({
  groupID:{
    type:String,
    required: true
  },
  isMsg:{
    type:Boolean,
    required: true
  },
  creatorID: {
    type:String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  expense: {
    title: {
      type: String,
      default: ""
    },
    cost: {
      type: Number,
      default: 0
    },
    remaining: {
      type: Number,
      default: 0
    },
    memberIDs: {
      type: [String],
      default: []
    },
    paid: {
      type: Boolean,
      default: false
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type:Boolean,
    default: false
  }
})

mongoose.model('messages', MsgSchema);