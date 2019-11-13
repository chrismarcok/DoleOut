const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Load User Model
require('../models/User');
const User = mongoose.model('users');

router.post('/login', (req, res) => {
  User.findOne({displayName: req.body.username})
  .then(user => {
    if (user){
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) throw errl
        if (result) {
          console.log("good")
          res.redirect('/u/0');
        } else {
          console.log("fail")
          res.redirect('/login');
        }
      })
    } else {
      console.log(`User ${req.body.username} does not exist`);
    }
  }).catch(err => console.log(err));
});

router.post('/register', (req, res) => {
  const newUser = new User({
    displayName: req.body.username,
    password: req.body.password,
    avatarURL: "https://api.adorable.io/avatars/200/default"
  });

  //serverside check that a user with this username doesnt already exist
  User.findOne({displayName: req.body.username})
    .then(user => {
      if (user){
        console.log(`user ${req.body.username} already exists`);
        res.redirect("/register");
      } else {
        //Make the user and save it to DB
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => {
              console.log(`${newUser.displayName} is registered and can now login.`);
              res.redirect('/login');
            })
            .catch(err => {
              console.log(err);
              return;
            });
          });
        });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;