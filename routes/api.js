const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Load  Models
require('../models/Group');
const Group = mongoose.model('groups');
require('../models/User');
const User = mongoose.model('users');
require('../models/Message');
const Messages = mongoose.model('messages');

//Auth
const { checkAuthenticated, checkAuthenticated403, checkGuest, checkAdmin } = require('../auth/authCheck');

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

router.get('/messages', checkAuthenticated, (req, res) => {
  Messages.find()
    .then(messages => {
      res.send(messages)
    })
    .catch(err => {
      console.log(err);
      res.redirect('./..');
    });
});

router.get('/admin', checkAuthenticated, checkAdmin, (req, res) => {
  res.send("you are an admin");
})

module.exports = router;