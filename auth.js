//If you are having issues with server.js not running and there is not an error then run "killall node" then try again.

/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

// Database Connection
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = "mongodb+srv://prod_myers100:mJ8g1ETxd5JbJepV@cluster0.aejsd.mongodb.net/test?retryWrites=true&w=majority&useUnifiedTopology=true";

// Database Name
const dbName = 'music';

// Create a new MongoClient
const client = new MongoClient(url);

//-----------------------------------How do I grab the first and last names from this???-----------------------------------------------
//Also how do I carry in the _id or email to /callback so we are putting this info into the correct user.

var client_id = 'a5fd338e87224bc0a4f0b1551e17d95e'; // Your client id
var client_secret = '036c97a0173e4e818a0562d8ac986eef'; // Your secret
var redirect_uri = 'http://143.244.165.192:5000/callback'; // Your redirect uri


var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/auth_public'))
   .use(cors())
   .use(cookieParser());

/////Spotify API
app.get('/spotify', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });

  app.get('/callback', function(req, res) {

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
    } 
    
    else {
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
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;

          //Access and Refresh Tokens
          client.connect (function(err) 
          {
            assert.equal(null, err);
            
            var ObjectId = require('mongodb').ObjectID;
            
            console.log("Connected successfully to server"); 
            const db = client.db(dbName);  
        
            if (err) { 
              throw err; 
            }

            else {
             var collection = db.collection("users");

             //--------------------------------------LOOK AT THIS-------------------------------------
             //Unsure how the users ID or email could get passed to here 
             collection.findOneAndUpdate({_id: ObjectId("60f30091b8c5b03d04f4a0e9")}, {$set: {"access_token": access_token, "refresh_token": refresh_token }},  function(err,doc) {
               if (err) { 
                 throw err; 
                }

               else { 
                 console.log("Updated"); 
                }
             });  
           } 
          });
  
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            console.log(body);
          });
  
          // we can also pass the token to the browser to make requests from there
          res.redirect('/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });

  app.get('/refresh_token', function(req, res) {

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
    
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token;

          //New Access Token          
          client.connect (function(err) 
          {
            assert.equal(null, err);
            
            var ObjectId = require('mongodb').ObjectID;
            
            console.log("Connected successfully to server"); 
            const db = client.db(dbName);  
        
            if (err) { 
              throw err; 
            }

            else {
             var collection = db.collection("users");

             //--------------------------------------LOOK AT THIS-------------------------------------
             //Unsure how the users ID or email could get passed to here 
             collection.findOneAndUpdate({_id: ObjectId("60f30091b8c5b03d04f4a0e9")}, {$set: {"access_token": access_token}},  function(err,doc) {
               if (err) { 
                 throw err; 
                }

               else { 
                 console.log("Updated"); 
                }
             });  
           } 
          });

          res.send({
            'access_token': access_token
          });
        }
      });
    });

console.log('Listening on 5000');
app.listen(5000);
