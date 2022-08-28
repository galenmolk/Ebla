// Load up the express framework and body-parser helper.
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of express to serve our end points.
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "POST, PUT, PATCH, GET, DELETE"
        )
        return res.status(200).json({})
    }
    next()
});

// We'll load up Node's build-in file system helper library here.
// (We'll be using this later to serve our JSON files).
const fs = require('fs');

// Configure our express instance ith some body-parser settings,
// including handling JSON data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This is where we'll handle our various routes from.
const routes = require('./routes/routes.js')(app, fs);

// Finally, launch our server on port 3000.
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
});
