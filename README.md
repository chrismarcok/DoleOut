# About

DoleOut is a web app that allows you to create groups with your friends to allow for easy expense splitting between group members. DoleOut will keep track of unpaid amounts that group members have yet to pay back. This app also facilitates real-time chat using web sockets (via socket.io). [You can view the website on heroku here.](https://doleout.herokuapp.com/)

![](https://i.gyazo.com/1f7a6147b1421e10920930100f993ffe.png)
![](https://i.gyazo.com/30b52504baa3a302fd7b0e3b7df38a56.png)
![](https://i.gyazo.com/2c72bcb736fd13daa347eca9cbe094cb.png)

[Phase 1 README](client/README.md)

If you need to build locally, clone the repo and navigate to team53/client. Skip this if you are on heroku.

1. run `npm install` to install the client dependencies.
2. run `npm run build`.
3. run `cd ..` to return to the team53 folder.
4. run `npm install` to install the server dependencies.
5. run `npm run dev`
6. open `localhost:5000` in Google Chrome
