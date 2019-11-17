const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {checkHexSanity} = require("./group");

//Load  Models
require('../models/Group');
const Group = mongoose.model('groups');
require('../models/User');
const User = mongoose.model('users');
require('../models/Message');
const Messages = mongoose.model('messages');

//Auth
const { checkAuthenticated, checkAuthenticated403, checkAdmin } = require('../auth/authCheck');

router.get('/groups', checkAuthenticated, (req, res) => {
  Group.find()
    .then(groups => {
      res.send(groups)
    })
    .catch(err => {
      console.log(err);
      res.redirect('./..');
    });
});

router.get('/me', checkAuthenticated403, (req, res) => {
  req.user.password = undefined
  res.send(req.user)
});

router.get('/u/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        user.password = undefined
        res.send(user)
      } else {
        res.sendStatus(400)
      }
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
})

router.get('/exists/:name', checkAuthenticated, (req, res) => {
  User.find({ displayName: req.params.name })
    .then(user => {
      user = user[0]
      if (user) {
        res.sendStatus(200);
      } else {

        res.sendStatus(400);
      }
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
})

router.get('/users', (req, res) => {
  User.find()
    .then(users => {
      users.forEach(u => {
        u.password = undefined
      });
      res.send(users)
    })
    .catch(err => {
      console.log(err);
      res.redirect('./..');
    });
});

//returns all messages. should not actually be used, just for debugging
router.get('/messages', checkAuthenticated, checkAdmin, (req, res) => {
  Messages.find()
    .then(messages => {
      res.send(messages)
    })
    .catch(err => {
      console.log(err);
      res.redirect('./..');
    });
});

//return the messages for group with groupid :group.
router.get('/gm/:group', checkAuthenticated, (req, res) => {
  if (!checkHexSanity(req.params.group)){
    res.sendStatus(400);
    return;
  }
  Group.findById(req.params.group)
  .then(group => {
    if (group){
      if (group.memberIDs.includes(req.user._id)){
        console.log("user is in that group.")
        return Messages.find({groupID: group._id})
      } else {
        console.log("current user is not in that group");
        res.sendStatus(403);
      }
    } else {
      console.log("null group");
      res.sendStatus(400);
    }
  })
  .then( messages => {
    res.send(messages);
  })
  .catch( err => {
    console.log(err);
    res.sendStatus(400);
  })
})

module.exports = router;