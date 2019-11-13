const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name:{
    type:String,
    required: true
  },
  icon:{
    type:String,
    required: true
  },
  color: {
    type:String,
    required: true
  },
  memberIDs: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('groups', GroupSchema);