// Load up the express framework and body-parser helper.
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of express to serve our end points.
const app = express();

// We'll load up Node's build-in file system helper library here.
// (We'll be using this later to serve our JSON files).
const fs = require('fs');

// Configure our express instance ith some body-parser settings,
// including handling JSON data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This is where we'll handle our various routes from.
const routes = require('./routes/routes.js')(app, fs);

// Finally, launch our server on port 3001.
const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
});
