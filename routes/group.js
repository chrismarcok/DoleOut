const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const path = require("path");

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
router.get('/:group', checkAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../", 'public', 'index.html'))
});

function checkHexSanity(id){
  const re = /[0-9a-f]{24}/g;
  return re.test(id);
}

/**
 * Updating (PATCH) a group (its name, could be color + icon too)
 */
router.patch('/:group', checkAuthenticated, (req, res) => {
  console.log(`Patching group with following body: ${req.body}`);
  Group.findOne({'_id': mongoose.Types.ObjectId(req.params.group)})
  .then( group => {
    if (group){
      if (req.user.isAdmin || group.superusers.includes(req.user._id)){
        Group.findOneAndUpdate({'_id': mongoose.Types.ObjectId(req.params.group)}, 
        {
          name: req.body.name,
          memberIDs: req.body.memberIDs,
        })
        .then( response => res.sendStatus(200))
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
      } else {
        console.log("not authorized");
        res.sendStatus(403);
      }
    } else {
      console.log("that group DNE");
      res.sendStatus(400);
    }
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
});

/**
 * Hiding (DELETE) a group
 */
router.delete('/:group', checkAuthenticated, (req, res) => {
  Group.findOne({'_id': mongoose.Types.ObjectId(req.params.group)})
  .then( group => {
    if (group){
      if (req.user.isAdmin || group.superusers.includes(req.user._id)){
        Group.findOneAndUpdate({'_id': mongoose.Types.ObjectId(req.params.group)}, 
        {
          deleted: true
        })
        .then( response => {
          console.log(`deleted ${req.params.group}`)
          res.sendStatus(200);
        })
        .catch( err => {
          console.log("could not delete group:");
          console.log(err);
        })
      } else {
        console.log("not authorized");
        res.sendStatus(403);
      }
    } else {
      console.log("that group DNE.")
      res.sendStatus(400);
    }
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
});

/**
 * Making a new MESSAGE to a group with id :group.
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
          isMsg: req.body.isMsg,
          creatorID: req.body.creatorID,
          content: req.body.content,
          expense: req.body.expense,
        })
        newMsg.save()
        .then( result => {
          console.log("Saved new message");
          console.log(result);
          res.send(result);
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