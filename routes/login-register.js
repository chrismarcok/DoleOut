const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
const passport = require('passport');

//Load User Model
require('../models/User');
const User = mongoose.model('users');

//Auth
const { checkAuthenticated, checkGuest } = require('../auth/authCheck');

router.get('/login', checkGuest, (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../", 'public', 'index.html'))
});

router.get('/register', checkGuest, (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../", 'public', 'index.html'))
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/groups',
  failureRedirect: '/login',
  failureFlash: true
}));

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

router.get('/logout', checkAuthenticated, (req, res) => {
  console.log(`${req.user.displayName} has been logged out.`);
  req.logout();
  res.redirect("/");
});


module.exports = router;