/*
TODO

When a user makes their first group, the "ur not in any groups" message still shows up.

When you fail to register or login, it should tell you why after redirected.

New user should be sent to their profile to be edited
*/

//Bring in our dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const cors = require("cors");
const server = require("http").Server(app);
const io = require("socket.io")(server);

//Require our routes
const login_register = require('./routes/login-register');
const groups = require('./routes/groups');
const { group } = require('./routes/group');
const users = require('./routes/users');
const api = require('./routes/api');

//Mongoose connection
mongoose.promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch( err => console.log(`Error: ${err}`));
require('./models/User');
const User = mongoose.model('users');
require('./models/Group');
const Group = mongoose.model('groups');

//Passport Authentication
const initializePassport = require('./auth/passport-config');
initializePassport(passport);

const { checkAuthenticated, checkAdmin } = require("./auth/authCheck");

//To allow posting to express server (port 5000) via react server (port 3000)
app.use(cors());

//To allow us to use the react app
app.use(express.static('public'));

//Body parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

//Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

//Use our routes
app.use('/', login_register);
app.use('/', groups);
app.use('/u', users);
app.use('/g', group);
app.use('/api', api);
app.get('/go/:name', (req, res) => {
  User.findOne({displayName: req.params.name})
  .then( user => {
    res.redirect(`/u/${user._id}`);
  })
  .catch( err => {
    console.log(`Error: Trying to FIND via GO user. ${err}`)
  })
})

connections = {};
rooms = {};

Group.find()
.then( groups => {
  groups.forEach( g => {
    rooms[g._id] = "something"
  });
})
.catch( err => console.log(err));

//TODO: Should require auth admin check
app.get("/connections", (req, res) => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(connections, null, 4));
});

// If we do not hit any of the above paths, then go to index in the public folder (react app)
app.get('*', (req, res) =>{
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

const PORT = process.env.PORT || 5000;

//Run the server
server.listen(PORT, () => console.log(`Express Server started on port ${PORT}`));

io.on("connection", socket => {
  socket.on("new-user", name => {
    connections[socket.id] = name;
  });

  socket.on("create", (room) => {
    socket.join(room);
  });

  socket.on("delete-msg", msgAndUser => {
    socket.to(msgAndUser.message.groupID).broadcast.emit("chat-message-delete", msgAndUser);
  });

  socket.on("send-chat-message",  msgWithUserObj => {
    socket.to(msgWithUserObj.message.groupID).broadcast.emit('chat-message', msgWithUserObj);
  })

  socket.on("disconnect", () => {
    delete connections[socket.id];
  })
})

