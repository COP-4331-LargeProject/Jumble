//If you are having issues with server.js not running and there is not an error then run "killall node" then try again.

var express = require('express'); // Express web server framework 
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
const bcrypt = require('bcryptjs')

const app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser());

const path = require('path');
const PORT = process.env.PORT || 5000;  

app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = "mongodb+srv://prod_myers100:mJ8g1ETxd5JbJepV@cluster0.aejsd.mongodb.net/test?retryWrites=true&w=majority&useUnifiedTopology=true";

// Database Name
const dbName = 'music';

// Create a new MongoClient
const client = new MongoClient(url);

//const id = "60de065e4f33d731c8a93f3e";

// Use connect method to connect to the Server
/*client.connect(function(err)
{
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  
  findGenreFeatures(id, db, function()
  {
    client.close();
  });
});

const findGenreFeatures = function(id, db, callback)
{
    // Get the documents collection
    const collection = db.collection('genre_audio_features');

    // Find some documents
    collection.find({
      "_id": ObjectId(id)
    }).toArray(function(err, docs)
    {
      console.log("Found the following records");
      console.log(docs)
      callback(docs); 
    });
  }*/ 
  
app.get('/api/testing', async (req, res) =>
{

  console.log(req.cookies);

  client.connect (function(err) 
  {
    assert.equal(null, err);
    console.log("Connected successfully to server"); 
    const db = client.db(dbName);  

    find(db, function() 
    {
      client.close();
    }); 
  });
    
  const find = function(db)
  {
      var ObjectId = require('mongodb').ObjectID;
  
      // Find some documents
      db.collection('users').find().toArray(function(err, docs)
      {

        console.log("Found the following records");
        console.log(JSON.stringify(docs, null, 4));
      });
    }
});

//LOGIN API

app.post('/api/login', async (req, res, next) => {  
    // incoming: email, password  
    // outgoing: id, firstName, lastName, error  
    var error = '';  

    client.connect(function(err)
    { 
      assert.equal(null, err);

      const { login, password } = req.body;

      const db = client.db(dbName);  
      const results = await;

      db.collection('Users').find({Email:email,Password:password}).toArray();

      var id = -1;  
      var fn = '';  
      var ln = '';  
      
      if( results.length > 0 )  
      {    
          id = results[0].UserId;    
          fn = results[0].FirstName;    
          ln = results[0].LastName;  
      }

    /*
      if( login.toLowerCase() == 'rickl' && password == 'COP4331' )  
      {    
          id = 1;    
          fn = 'Rick';    
          ln = 'Leinecker';  
      }  
      else  
      {    
          error = 'Invalid user name/password';  
      }*/
      
      
      //check to see if id is correct in DB
      var ret = { id:id, firstName:fn, lastName:ln, error:''};  
      res.status(200).json(ret);

      client.close();
    });
});

////Register API

app.post('/api/register', async (req, res) =>
{
  client.connect (function(err)
  {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName); 

    // incoming: email, password 
    // outgoing: error

    const { email, password, first_name, last_name } = req.body; 

    //Check to see if email exists.
    find(first_name, last_name, password, email, db, function() 
    {
      client.close();
    });
  });
    
  const find = function(first_name, last_name, password, email, db)
  {
      var ret = "";
      var id = "";

      // Find some documents
      db.collection('users').find({"email": email}).toArray(function(err, results)
      {
        console.log("Found the following records");
        console.log(results.length);

        if(results.length > 0){
          ret = { error: "Email is already in use." };
          console.log(ret);
          res.status(200).json(ret);
        }

        else{
            //hash the password
            hash = bcrypt.hashSync(password, 10);

            //Create newUser with a hashed password
            const newUser = { email: email, password: hash, first_name: first_name, last_name: last_name};

            var error = '';

            //Insert newUser
            try{
              db.collection('users').insertOne(newUser);
            }
            catch(e){
              error = e.toString(); 
            }

            db.collection('users').find({"email": email}).toArray(function(err, results){
              //ret = { error: error, id: results[0]._id};
              //console.log(ret);

              res.cookie("_id", results[0]._id, {expire: 86400000 + Date.now()});
              res.send("Data added to cookie");
              
            });
        }
      });
    }
});



////Logout API
app.post('/api/logout', (req, res) =>
{
  res.clearCookie('_id');
  console.log("User logged out")
  res.sendStatus(200);
});



/////Spotify API
var client_id = 'fd29bb9cc430409d804a2bac1ddc8b9d'; // Your client id
var client_secret = 'e07764368ae74bd09d8a61f64bc2c25f'; // Your secret
var redirect_uri = 'http://143.244.165.192:5000/callback/'; // Your redirect uri

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

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

  //Callback for Spotify API
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

             //Update Access Token and Refresh Token using userID cookie
             collection.findOneAndUpdate({_id: ObjectId(userID)}, {$set: {"access_token": access_token, "refresh_token": refresh_token }},  function(err,doc) {
               if (err) { 
                 throw err; 
                }

               else { 
                  console.log("Updated"); 

                  res.cookie("access_token", access_token, {expire: 86400000 + Date.now()});
                  res.cookie("refresh_token", refresh_token, {expire: 86400000 + Date.now()});
                  res.send("Data added to access and refresh token cookies")
                }
             });  
           } 
          });
  
          /*var options = {
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
            }));*/
        } 
        
        else {
          /*res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));*/

            res.send("Error Invalid Token")
        }
      });
    }
  });

  //Refresh Token API
  app.get('/refresh_token', function(req, res) {

      // requesting access token from refresh token
      var refresh_token = req.cookies.refresh_token;
      var userID = req.cookies._id


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

             //Update Access Token
             collection.findOneAndUpdate({_id: ObjectId(userID)}, {$set: {"access_token": access_token}},  function(err,doc) {
               if (err) { 
                 throw err; 
                }

               else { 
                 console.log("Updated"); 
                }
             });  
           } 
          });

          res.cookie("access_token", access_token, {expire: 86400000 + Date.now()});
          res.send("Data added to access token cookie")
        }
      });
    });



app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
});

console.log('Server listening on port ' + PORT)
app.listen(PORT);
