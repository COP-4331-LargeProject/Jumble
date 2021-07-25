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
  
  
app.post('/api/delete', async (req, res, next) =>
{
  client.connect (function(err) 
  {
    assert.equal(null, err);
    
    var ObjectId = require('mongodb').ObjectID;
    
    console.log("Connected successfully to server"); 
    const db = client.db(dbName);  

    if (err) { throw err; }
    else {
     var collection = db.collection("users");
     collection.deleteMany({first_name: "test3"},  function(err,doc) {
       if (err) { throw err; }
       else { 
         console.log("Deleted"); 
         res.send("Deleted");
       }
     });  
   } 
  });
});
  
  
app.post('/api/testing', async (req, res) =>
{

  console.log(req.cookies);

  client.connect (function(err) 
  {
    assert.equal(null, err);
    console.log("Connected successfully to server"); 
    const db = client.db(dbName);  
    
    const { search } = req.body;

    find(search, db, function() 
    {
      client.close();
    }); 
  });
    
  const find = function(search, db)
  {
      var ObjectId = require('mongodb').ObjectID;
  
      // Find some documents
      db.collection(search).find().toArray(function(err, docs)
      {

        console.log("Found the following records");
        console.log(JSON.stringify(docs, null, 4));
      });
    }
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
    // outgoing: error, user_id cookie

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
          res.status(401).json({errorMessage: "Email is already in use"});
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

              res.cookie("user_id", results[0]._id, {expire: 86400000 + Date.now()});
              res.status(200).json("Data added to cookie");
              
            });
        }
      });
    }
});

//LOGIN API

app.post('/api/login', async (req, res) =>     
 {      
     client.connect (function(err)
  {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName); 

    // incoming: email, password 
    // outgoing: error, user_id cookie

    const { email, password } = req.body; 

     if ( !email || !password ) {
            return res.status(400).json({ errorMessage: "Please enter all required fields."});
        }

    //Check to see if email exists.
    find(password, email, db, function() 
    {
      client.close();
    });
  });
    
  const find = async function(password, email, db)
  {
      var ret = "";
      var id = "";

      // Find some documents
      const user = db.collection('users').find({"email": email}).toArray(async function(err, results)
      {
        console.log("Found the following records");

        if(results.length > 0){
            
          pass = results[0].passwordHash;
          const cmp = await bcrypt.compare(req.body.password, pass);
            if (cmp) {
        //   ..... further code to maintain authentication like jwt or sessions
                
            // res.send("Auth Successful");

              res.cookie("user_id", results[0]._id, {expire: 86400000 + Date.now()});
              res.send("Data added to cookie");
            } else {
            
                return res.status(401).json({errorMessage: "Wrong email and password"});
            }  
          //res.status(200).json(ret);
        }
        else{
            return res.status(401).json({errorMessage: "Wrong email and password"});
        }

      });
    
    }
    
});




////Logout API
app.post('/api/logout', (req, res) =>
{
  res.clearCookie('user_id');
  console.log("User logged out")
  res.sendStatus(200);
});



///// Spotify API
var client_id = 'fd29bb9cc430409d804a2bac1ddc8b9d'; // Your client id
var client_secret = 'e07764368ae74bd09d8a61f64bc2c25f'; // Your secret
var redirect_uri = 'http://jumble.site/callback'; // Your redirect uri

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
             
             console.log(req.cookies);
             console.log("Before redirect"); 
             
             
             //-------------------------------------------------------COOKIE PROBLEM HERE---------------------------------------------------------------------
             //I'm uncetrain about how to pull a cookie into here, every time I try I get cookies from spotify, don't know how to pull them from our site.
             
             
             //Store access and refresh token, finding use by using _id cookie
             collection.findOneAndUpdate({user_id: ObjectId("60fabb28c25a6e8275697eb9")}, {$set: {"access_token": access_token, "refresh_token": refresh_token }},  function(err,doc) {
               if (err) { 


                 throw err; 
                }

               else { 
                  console.log("Updated"); 
                  
                  
            //-------------------------------------------------------COOKIE PROBLEM HERE---------------------------------------------------------------------
            //These are not sending cookies back to our Front End

                  //Send Access and refresh token to front end as cookies
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
             collection.findOneAndUpdate({user_id: ObjectId(userID)}, {$set: {"access_token": access_token}},  function(err,doc) {
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
  
  app.get('/spotify/search', async (req, res) =>
  {
    console.log(req.cookies);
    user_id = req.cookies.user_id;

    var searchObject = {
      url: 'https://api.spotify.com/v1/search',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        q: 'ocean man',
        type: 'track',
        market: 'US',
        limit: 1
      },
      json: true
    };

    request.get(searchObject, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var name = body.tracks.items[0].name;

        res.status(200).json(name);
      }
      else
      res.status(500).json("Error. Could not GET https://api.spotify.com/v1/search");
    });
  });
    
  ////Genre API
  
  app.post('/api/genre', async (req, res) => 
  {
    client.connect (function(err)
    {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName); 
  
      // incoming: user_id, genre_id, name, sample_artists, sample_tracks
      // outgoing: none
  
      const { genre_id, name, sample_artists, sample_tracks } = req.body;
      var user_id = req.cookies.user_id;
  
      insert(genre_id, name, sample_artists, sample_tracks, db, user_id, function(){
        client.close();
      });
  
    });
  
    const insert = function(genre_id, name, sample_artists, sample_tracks, db, user_id){
    
    var ObjectId = require('mongodb').ObjectID;
  
      // Find if the genre exists for the user
      db.collection('genres').find({"genre_id": genre_id, "user_id":ObjectId(user_id) }).toArray(function(err, results)
      {
      
        if(results.length > 0){
  
          console.log("The genre already exists for this user");
  
          //db.collection('genres').findOneAndUpdate({"genre_id": genre_id, "user_id":ObjectId(user_id) }, {$push: {"sample_artists": sample_artists, "sample_tracks": sample_tracks}},  function(err,doc) {
            //if (err) { 
            //  throw err; 
            //}
  
            //else { 
            //  console.log("Updated"); 
            // res.status(200).json("Tracks has been added to user's genre"); 
            //}
          //});  
  
        }
  
        else{
  
          console.log("The genre does not exist for the user");
  
          //Create the genre
          const newGenre = { user_id: ObjectId(user_id), genre_id: genre_id, name: name, sample_artists: sample_artists, sample_tracks: sample_tracks};
  
          //Insert newGenre
          try{
            db.collection('genres').insertOne(newGenre);
          }
          catch(e){
            error = e.toString(); 
          }
  
          res.status(200).json("Genre has been added for user");
  
        }
      });
    }
   });
   
     //List Users Liked Tracks
  app.get('/api/liked_tracks', async (req, res) =>
  {
  
    console.log(req.cookies);
    user_id = req.cookies.user_id;
  
    client.connect (function(err) 
    {
      assert.equal(null, err);
      console.log("Connected successfully to server"); 
      const db = client.db(dbName);  
  
      find(user_id, db, function() 
      {
        client.close();
      }); 
    });
      
    const find = function(user_id, db)
    {
        var ObjectId = require('mongodb').ObjectID;
    
        // Find Users Liked Tracks
        db.collection('user_liked_tracks').find({"user_id": ObjectId(user_id)}).toArray(function(err, docs)
        {
  
          var ret = docs;
          res.status(200).json(ret);
        });
      }
  });
  
  //List Users Disliked Tracks
  app.get('/api/disliked_tracks', async (req, res) =>
  {
  
    console.log(req.cookies);
    user_id = req.cookies.user_id;
  
    client.connect (function(err) 
    {
      assert.equal(null, err);
      console.log("Connected successfully to server"); 
      const db = client.db(dbName);  
  
      find(user_id, db, function() 
      {
        client.close();
      }); 
    });
      
    const find = function(user_id, db)
    {
        var ObjectId = require('mongodb').ObjectID;
    
        // Find Users Liked Tracks
        db.collection('user_disliked_tracks').find({"user_id": ObjectId(user_id)}).toArray(function(err, docs)
        {
  
          var ret = docs;
          res.status(200).json(ret);
        });
      }
  });
  
    ////Dislike API
  
  app.post('/api/dislike', async (req, res) => 
  {
    client.connect (function(err)
    {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName); 

      // incoming: track_id
      // outgoing: none

      const { track_id } = req.body;
      var user_id = req.cookies.user_id;

      insert(track_id, db, user_id, function(){
        client.close();
      });
    });

    const insert = function(track_id, db, user_id){

      var ObjectId = require('mongodb').ObjectID;

      //Create new disliked track
      const dislikedtrack = { user_id: ObjectId(user_id), track_id:track_id };

      //Add disliked track
       try{
        db.collection('user_disliked_tracks ').insertOne(dislikedtrack);
      }
      catch(e){
        error = e.toString(); 
      }

      res.status(200).json("Track was added to dislikes");

    }

  });
  
  
   ////Like API
  
  app.post('/api/like', async (req, res) => 
  {
    client.connect (function(err)
    {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName); 

      // incoming: track_id, name, genre
      // outgoing: unknown

      const { track_id, name, genre } = req.body;
      var user_id = req.cookies.user_id;

      insert(track_id, name, genre, db, user_id, function(){
        client.close();
      });
    });

    const insert = function(track_id, name, genre, db, user_id){

      var ObjectId = require('mongodb').ObjectID;

      //Create new liked track
      const likedtrack = { user_id: ObjectId(user_id), track_id:track_id, name:name, genre:genre, };

      //Insert liked track
       try{
        db.collection('user_liked_tracks ').insertOne(likedtrack);
      }
      catch(e){
        error = e.toString(); 
      }

      res.status(200).json("Track was added to likes");

    }

  });


app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
});

console.log('Server listening on port ' + PORT)
app.listen(PORT);
