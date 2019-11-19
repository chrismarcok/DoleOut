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

/**
 * Get all groups
 */
router.get('/groups', checkAuthenticated403, (req, res) => {
  Group.find()
    .then(groups => {
      res.send(groups)
    })
    .catch(err => {
      console.log(err);
      res.redirect('./..');
    });
});

/**
 * Get all groups but the one in :group, that the user is in
 */
router.get('/groupsExcept/:group', checkAuthenticated403, (req, res) => {
  if (!checkHexSanity(req.params.group)){
    res.sendStatus(400);
    return;
  }
  Group.find()
    .then(groups => {
      const filtered = groups.filter( g => !g.deleted && String(g._id) !== req.params.group && g.memberIDs.includes(req.user._id));
      res.send(filtered);
    })
    .catch(err => {
      console.log(err);
      res.redirect('./..');
    });
});


/**
 * Get all members of a group :group
 */
router.get('/membersOf/:group', checkAuthenticated403, (req, res) => {
  if (!checkHexSanity(req.params.group)){
    res.sendStatus(400);
    return;
  }
  Group.findOne({'_id': mongoose.Types.ObjectId(req.params.group)})
  .then( group => {
    const membersList = group.memberIDs;
    if (!membersList.includes(req.user._id)){
      throw new Error(`${req.user._id} is not a part of group members ${membersList}`);
    }
    promises = [];
    membersList.forEach(memberID => promises.push(User.findOne({'_id': mongoose.Types.ObjectId(memberID)})));
    return Promise.all(promises);
  })
  .then(values => {
    values.forEach( v => v.password = undefined);
    res.send(values);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  })
});

/**
 * Return logged in user
 */
router.get('/me', checkAuthenticated403, (req, res) => {
  req.user.password = undefined
  res.send(req.user)
});

/**
 * Get the user with given ID
 */
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

/**
 * Get the user with given username
 */
router.get('/username/:name', (req, res) => {
  User.findOne({displayName: req.params.name})
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

/**
 * Get the group with given ID
 */
router.get('/g/:id', (req, res) => {
  Group.findById(req.params.id)
    .then(group => {
      if (group) {
        res.send(group)
      } else {
        res.sendStatus(400)
      }
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
})

/**
 * Check if a user exists. Send 200 if it does, 400 otherwise.
 */
router.get('/exists/:name', checkAuthenticated403, (req, res) => {
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

/**
 * Return ALL users
 */
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

/**
 * Returns all messages. should not actually be used, just for debugging
 */
router.get('/messages', checkAuthenticated403, checkAdmin, (req, res) => {
  Messages.find()
    .then(messages => {
      res.send(messages)
    })
    .catch(err => {
      console.log(err);
      res.redirect('./..');
    });
});

/**
 * Return the messages for group with groupid :group.
 */
router.get('/gm/:group', checkAuthenticated403, (req, res) => {
  let filtered = undefined;
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
    filtered = messages.filter( m => !m.deleted);
    const promises = []
    filtered.forEach( message => promises.push(User.findOne({'_id': mongoose.Types.ObjectId(message.creatorID)})))
    return Promise.all(promises);
  })
  .then(values => {
    values.forEach(val => {
      val.password = undefined;
      filtered = {[val._id]: val, ...filtered};
    });
    res.send(filtered);
  })
  .catch( err => {
    console.log(err);
    res.sendStatus(400);
  })
})

module.exports = router;