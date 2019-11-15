/*
TODO

When a user makes their first group, the "ur not in any groups" message still shows up.

When you fail to register or login, it should tell you why after redirected.

New user should be sent to their profile to be edited
*/

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const cors = require("cors");

//Require our routes
const login_register = require('./routes/login-register');
const groups = require('./routes/groups');
const api = require('./routes/api');

//Authentication checks
const { checkAuthenticated, checkGuest } = require('./auth/authCheck');

mongoose.promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch( err => console.log(`Error: ${err}`));


const initializePassport = require('./auth/passport-config');
initializePassport(passport);

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api);
app.use('/', login_register);
app.use('/', groups);
app.get('/forbidden', checkAuthenticated, (req, res) => {
  res.send(`you are authenticated, ${req.user.displayName}`);
  console.log(req.user);
});


// If we do not hit any of the above paths, then go to index in the public folder (react app)
app.get('*', (req, res) =>{
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Express Server started on port ${PORT}`));
