/****** LOCAL SERVER ******/
require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session')

// Sets app as local server
const app = express();

app.use(json());
app.use(cors());

// Allows local server to utilize SQL commands within db folder
app.use(massive(process.env.CONNECTION_STRING))
  .then(dbInstance => {
    app.set("db", dbInstance);
}).catch(err => console.log(err));

// Allows application to be utilized by multiple users
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

// Runs the server on localhost:3001
const port = process.env.PORT || 3001;
app.listen(port, `Listening on port: ${ port }`);