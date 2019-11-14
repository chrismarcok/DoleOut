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
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    remaining: {
      type: Number,
      require: true
    },
    memberIDs: {
      type: [String],
      require: true
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