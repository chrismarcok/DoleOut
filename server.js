const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/asdf', (req, res) => {
  res.redirect("/login");
});


// If we do not hit any of the above paths, then go to index in the public folder (react app)
app.get('*', (request, response) =>{
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
