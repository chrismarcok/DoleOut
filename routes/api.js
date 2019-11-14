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
const { checkAuthenticated, checkGuest, checkAdmin } = require('../auth/authCheck');

router.get('/groups', checkAuthenticated, (req, res) => {
  Group.find()
  .then(groups => {
    res.send(groups)
  })
  .catch( err =>{
    console.log(err);
    res.redirect('./..');
  });
});

router.get('/users', checkAuthenticated, (req, res) => {
  User.find()
  .then(users => {
    res.send(users)
  })
  .catch( err =>{
    console.log(err);
    res.redirect('./..');
  });
});

router.get('/messages', checkAuthenticated, (req, res) => {
  Messages.find()
  .then(messages => {
    res.send(messages)
  })
  .catch( err =>{
    console.log(err);
    res.redirect('./..');
  });
});

router.get('/admin', checkAuthenticated, checkAdmin, (req, res) => {
  res.send("you are an admin");
})

module.exports = router;