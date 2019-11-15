const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const path = require("path");

//Load User Model
require('../models/User');
const User = mongoose.model('users');
require('../models/Group');
const Group = mongoose.model('groups');

const { checkAuthenticated, checkGuest } = require('../auth/authCheck');

const sanityCheck = (body) => {
  console.log(body)
  if (body == null || body == undefined){
    console.log("body null")
    return false;
  }
  if (body.name == null || body.name === ""){
    console.log("name null")
    return false;
  }
  if (body.icon == null || body.icon === ""){
    console.log("icon null")
    return false;
  }
  if (body.colorBg == null || body.colorBg === ""){
    console.log("color null")
    return false;
  }
  return true;
}

router.get('/groups', checkAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../", 'public', 'index.html'))
})

router.post('/groups', checkAuthenticated, (req, res) => {
  console.log(`User ${req.user}`);
  const body = req.body;
  if (!sanityCheck(body)){
    console.log("bad request");
    res.sendStatus(400);
    return;
  }
  const newGroup = new Group({
    name: body.name,
    icon: body.icon,
    color: body.colorBg,
    memberIDs: body.members,
  });
  newGroup.save()
  .then(group => {
    console.log(`Group ${body.name} created by ${req.user.displayName} on ${new Date()}`);
  })
  .catch(err => {
    console.log(err)
  });
  res.sendStatus(200);
});

module.exports = router;