const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require('../models/User');
const User = mongoose.model('users');
require('../models/Message');
const Message = mongoose.model('messages');
require('../models/Group');
const Group = mongoose.model('groups');

const { checkAuthenticated } = require('../auth/authCheck');

/**
 * Getting a group with id :group.
 */
// router.get('/:group', checkAuthenticated, (req, res) => {
//   res.sendFile(path.resolve(__dirname + "/../", 'public', 'index.html'))
// });

function checkHexSanity(id){
  const re = /[0-9a-f]{24}/g;
  return re.test(id);
}

/**
 * Making a new post to a group with id :group.
 */
router.post('/:group', (req, res) => {
  //sanity check
  if (!checkHexSanity(req.params.group)){
    res.sendStatus(400);
  }
  //Check if req.user._id in group
  Group.findOne({'_id': mongoose.Types.ObjectId(req.params.group)})
  .then( group => {
    console.log(group)
    if (group){
      if (group.memberIDs.includes(req.user._id)){
        const newMsg = new Message({
          //This needs to be filled out properly
          groupID: req.body.groupID,
          isMsg: true,
          creatorID: '5dce58b655cd6a2804e199df',
          content: 'Message text',
          expense: null
        })
        newMsg.save()
        .then( result => {
          console.log("Saved new message");
          console.log(result);
          res.sendStatus(200);
        })
        .catch( err => {
          console.log("Could not save new message");
          console.log(err);
          res.sendStatus(500);
        })
      }
    } else {
      console.log("that group DNE.")
      res.sendStatus(400);
    }
  })
  .catch( err => {
    console.log(err);
  });
});

module.exports = { 
  group: router, 
  checkHexSanity: checkHexSanity 
};