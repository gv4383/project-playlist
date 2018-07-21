/****** LOCAL SERVER ******/
require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session')
const path = require('path');

// REQUIRED FOR SPOTIFY SERVER
const request = require('request'); // "Request" library
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const song_cntrl = require('./controllers/song_cntrl');
const playlist_cntrl = require('./controllers/playlist_cntrl');
const user_cntrl = require('./controllers/user_cntrl');

// Sets app as local server
const app = express();

app.use(json());
app.use(cors());
// app.use(express.static(__dirname + '/../build'));

// Allows local server to utilize SQL commands within db folder
massive(process.env.CONNECTION_STRING)
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

// Gets list of songs stored in the database
app.get('/api/songs/:id', song_cntrl.getSongs);

// Adds a song associated with a playlist to the database
app.post('/api/songs', song_cntrl.addSong);

// Removes a song associated with a playlist in the database
app.delete('/api/songs/:id', song_cntrl.removeSong);


// Gets list of playlists stored in the database
app.get('/api/playlists', playlist_cntrl.getPlaylists);

// Creates new playlist entry
app.post('/api/playlists', playlist_cntrl.createPlaylist);

// Deletes a playlist entry
app.delete('/api/playlists/:id', playlist_cntrl.deletePlaylist);

// Edits a playlist's description
app.put('/api/playlists/:id', playlist_cntrl.editPlaylistDescription);


// Gets a user from users table in database
app.get('/api/users/:id', user_cntrl.getUser);

// Adds a user to users table in database
// app.post('/api/users', user_cntrl.addUser);



/************ SPOTIFY SERVER SECTION ************/

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = process.env.REDIRECT_URI; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

// var app = express();

app.use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

app.get('/login', function (req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function (req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, async function (error, response, body) {

          console.log(body);

          const { id, email, country, images } = body;
          // const { url } = images[0]

          const db = app.get('db');

          const res1 = await db.get_user([id])
          if (!res1[0]) {
            await db.add_user([id, email, country])
            // res.status(200).send(user[0])
          }

          // else {
          //   // res.status(200).send(res1[0]);
          // }


          // local
          res.redirect('http://localhost:3000/#/search/' +
            // hosting
            // res.redirect('/search/') +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
              username: id,
              email: email,
              country: country
            }));
        });

        // we can also pass the token to the browser to make requests from there
        // res.redirect('/tester?' +
        //   querystring.stringify({
        //     access_token: access_token,
        //     refresh_token: refresh_token
        // }));

        // console.log(body);
        // res.redirect('http://localhost:3000/#/search/' +
        // querystring.stringify({
        //   access_token: access_token,
        //   refresh_token: refresh_token
        // }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function (req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

// app.get('/tester', (req, res, next) => {
//   const { query } = req;
//   console.log({ query });
//   res.redirect('http://localhost:3000');
// })

/************ SPOTIFY SERVER SECTION ************/



// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });

// Runs the server on localhost:3001
const port = process.env.PORT || 3001;
app.listen(port, () => { console.log(`Listening on port: ${port}`) });