//If you are having issues with server.js not running and there is not an error then run "killall node" then try again.

var express = require('express'); // Express web server framework 
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring'); 
const { curly } = require("node-libcurl");
const bcrypt = require('bcryptjs');
const crypt = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser());

const path = require('path');
const PORT = process.env.PORT || 5000;  

app.set('port', (process.env.PORT || 5000));

var router = express.Router();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = "mongodb+srv://prod_myers100:mJ8g1ETxd5JbJepV@cluster0.aejsd.mongodb.net/music?retryWrites=true&w=majority&useUnifiedTopology=true";

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
     collection.deleteMany({first_name: "Timothy"},  function(err,doc) {
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
        res.send();
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
      var unencryptedVerify = crypt.randomBytes(32).toString('hex');
      const encryptedVerify = crypt.createHash('sha256').update(unencryptedVerify).digest('hex');

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
            const newUser = { email: email, password: hash, first_name: first_name, last_name: last_name, verify_token:encryptedVerify};

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

              const verifyURL = `${req.protocol}://${req.get('host')}`;
              ///api/login`;
              ///resetPassword/${unencryptedVerify}`;
              var Options = {email, unencryptedVerify, verifyURL};
              sendVerify(Options);
              
              res.cookie("user_id", results[0]._id, {expire: 86400000 + Date.now()});
              res.status(200).json("Data added to cookie");
              
            });
        }
      });
    }
});

// Send verification email
const sendVerify = async verifyOptions => 
{
  // Create email connection
  var transport = nodemailer.createTransport({
    // FOR TESTING
    //host: "smtp.mailtrap.io",
    //port: 2525,
    service: "hotmail",    
    auth: {
      //user: "acfbcf19fe9545",
      //pass: "0be610ecf5b6b9"
      user: "jumble-password-recovery@outlook.com",      
      pass: "Veryinsecurepassword"      
    }
  });
  
  // Define email params
  var options = {
    from: '"Password Recovery" <jumble-password-recovery@outlook.com>',
    to: verifyOptions.email,
    subject: 'Account Verification',
    text: `Just created a new account? Verify it now! \n\nFollow the link below to verify your new account and log in.\n\n${verifyOptions.verifyURL}`,
    //html: '<h1>Just created a new account? Verify it now!</h1><p> Follow the link below to verify your new account and log in.</p><a href="verifyOptions.verifyURL">Will redirect you to login page!</a>'
  };

  // Send email
  transport.sendMail(options, (error, info) =>
  {
    if (error) {
      console.log(error);
    }
    //console.log('Email sent: ' + info.messageId);
  });
};

// Verify account status
app.post('/api/accountVerification/:verification', async (req, res, next) => 
{
  // Find user via email and token
  const {email} = req.body;
  const db = client.db(dbName);   
  const verifyToken = crypt.createHash('sha256').update(req.params.verification).digest('hex');
  const verifyUserEmail = await db.collection('users').findOne({email:email, verify_token:verifyToken});
  if (!verifyUserEmail)
  {
    res.status(400).json({Error:'Email and verification token combination does not exist. Please try again.'});
  }

  // Return verified
  else
  {
    res.status(200).json({
      'User':'Verified',
      Error:''
    });
  }
  // Redirect
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

        if(results.length > 0){
            
          //Grab the password from database
          pass = results[0].password;
          
              const validPassword = await bcrypt.compare(password, pass);  
  
                if(!results[0].verify_token)
                {
                  return res.status(401).json({errorMessage: "Unverified Account"});;
                }
                
                if(validPassword){
                  res.cookie("user_id", results[0]._id, {expire: 86400000 + Date.now()});
                  res.send("Data added to cookie");
                }
              
              else {
                  //Email was found, but password did not match
                  return res.status(401).json({errorMessage: "Wrong password"});
              }  
        }
        else{
            //Email was not found
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
var client_id = 'a5fd338e87224bc0a4f0b1551e17d95e'; // Your client id
var client_secret = '036c97a0173e4e818a0562d8ac986eef'; // Your secret
var redirect_uri = 'http://jumble.site:5000/callback/'; // Your redirect uri

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

app.get('/api/spotify', function(req, res) {
    
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
  
    if (state === null || state !== storedState)
    {
      console.log('API /callback error: state_mismatch');
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
             
             console.log(req.cookies.user_id);
             user_id = req.cookies.user_id;
             console.log("Before redirect"); 
             
             
             //-------------------------------------------------------COOKIE PROBLEM HERE---------------------------------------------------------------------
             //I'm uncetrain about how to pull a cookie into here, every time I try I get cookies from spotify, don't know how to pull them from our site.
             
             
             //Store access and refresh token, finding use by using _id cookie
             collection.findOneAndUpdate({"_id": ObjectId(user_id)}, {$set: {"access_token": access_token, "refresh_token": refresh_token }},  function(err,doc) {
               if (err) { 


                 throw err; 
                }

               else { 
                  console.log("Updated"); 
                  
                  console.log(doc);
                  
                  
            //-------------------------------------------------------COOKIE PROBLEM HERE---------------------------------------------------------------------
            //These are not sending cookies back to our Front End

                  //Send Access and refresh token to front end as cookies
                  res.cookie("access_token", access_token, {expire: 86400000 + Date.now()});
                  res.cookie("refresh_token", refresh_token, {expire: 86400000 + Date.now()});
                  res.redirect('/#/Dashboard');
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
             collection.findOneAndUpdate({"_id": ObjectId(userID)}, {$set: {"access_token": access_token}},  function(err,doc) {
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
  
  // Spotify Search
  /*
    @params
      type: string. Must be exactly "track" or "artist"
      query: string
      access_token: provided by cookie
      example: /spotify/search/track/Ocean Man
  */
  app.get('/spotify/search/:type/:query', async (req, res) =>
  {
    // See if this was sent from a non-user
    if(req.cookies.access_token == null)
    {
      res.status(401).json("Error not token passed.");
      return;
    }
    
    //var query = 'ocean man';
    //var type = 'track';

    if(req.params.query == null || req.params.type == null)
    {
      res.status(400).json("Error: Invalid search query.");
      return;
    }
    
    var getFields = querystring.stringify({
      q: req.params.query,
      type: req.params.type,
      market: 'US',
      limit: 1
    });
    
    const { statusCode, data } = await curly.get('https://api.spotify.com/v1/search?' + getFields, {
      httpHeader: [
        'Content-Type: application/json',
        'Accept: application/json',
        'Authorization: Bearer ' + req.cookies.access_token
      ],
    });
    
    if(statusCode != 200)
    {
      res.status(400).json("Error. Could not access spotify");
      return;
    }
    
    if(req.params.type === "artist")
      res.status(200).json(data.artists.items[0].id);
    else if(req.params.type === "track")
      res.status(200).json(data.tracks.items[0].id);
    else
      res.status(400).json("Error: No search type.");
  });

  // Spotify Recommendation
  /*
    @params
      user_id, ObjectID
      genre_id: string
      access_token: provided by cookie
      example: /spotify/recommendation/4342423/rock
  */
  app.get('/spotify/recommendation/:user_id/:genre_id', async (req, res) =>
  {
    client.connect (function(err)
    {
      assert.equal(null, err);
      console.log("Connected successfully to mongoDB server.");
      const db = client.db(dbName);

      // incoming: user_id, genre_id

      if(req.params.user_id == null || req.params.genre_id == null)
        res.status(400).json("Error: user_id or genre_id was empty.");

      // Make sure the access token is present
      if(req.cookies.access_token == null)
      {
        res.status(401).json("Error not token passed.");
        return;
      }

      find(req.params.user_id, req.params.genre_id, db, function()
      {
        client.close();
      });
    });

    const find = function(user_id, genre_id, db)
    {
      var ObjectId = require('mongodb').ObjectID;
      user_id = ObjectId(user_id);
      
      db.collection('genres').find({"genre_id": genre_id, "user_id":user_id }).toArray(function(err, results)
      {
        // Returns 200 and the documents
        if(results.length > 0)
        {
          var getFields = querystring.stringify({
            seed_artists: results[0].sample_artists,
            seed_genres: results[0].genre_id,
            seed_tracks: results[0].sample_tracks,
            market: 'US',
            limit: 1
          });

          spotifyGET(getFields, user_id, db);
        }

        // Returns 500 and an error message
        else
          res.status(500).json("Error: Unable to locate user's genre information.");
      });

      return;
    }

    const spotifyGET = async function(getFields, user_id, db)
    {
      const { data } = await curly.get('https://api.spotify.com/v1/recommendations?' + getFields, {
        httpHeader: [
          'Content-Type: application/json',
          'Accept: application/json',
          'Authorization: Bearer ' + req.cookies.access_token
        ],
      });
      
      if(checkAlreadyLiked(user_id, data.tracks[0].id, db))
      {
        spotifyGET(getFields, user_id, db);
        console.log("User has liked this song before. Will generate another.");
        return;
      }

      if(checkAlreadyDisliked(user_id, data.tracks[0].id, db))
      {
        spotifyGET(getFields, user_id, db);
        console.log("User has disliked this song before. Will generate another.");
        return;
      }

      res.status(200).json(data);
      return;
    }

    // If a song has been liked/disliked, return true
    // Returns false otherwise
    const checkAlreadyLiked = function(user_id, track_id, db)
    {
      db.collection('user_liked_tracks').find({"user_id": user_id, "track_id":track_id }).toArray(function(err, results)
      {
        if(results.length > 0)
          return true;
        else
          return false;
      });
    }

    const checkAlreadyDisliked = function(user_id, track_id, db)
    {
      db.collection('user_disliked_tracks').find({"user_id": user_id, "track_id":track_id }).toArray(function(err, results)
      {
        if(results.length > 0)
          return true;
        else
          return false;
      });
    }
  });
    
  ////Genre API
  
  app.post('/api/genre', async (req, res) => 
  {
    client.connect (function(err)
    {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName); 
  
      // incoming: user_id, genre_id, track, sample_artists, sample_tracks
      // outgoing: none
  
      const { genre_id, genre_name, sample_artists, sample_tracks } = req.body;
      var user_id = req.cookies.user_id;
  
      insert(genre_id, genre_name, sample_artists, sample_tracks, db, user_id, function(){
        client.close();
      });
  
    });
  
    const insert = function(genre_id, genre_name, sample_artists, sample_tracks, db, user_id)
    {
    var ObjectId = require('mongodb').ObjectID;

      // Find if the genre exists for the user
      db.collection('genres').find({"user_id":ObjectId(user_id) }).toArray(function(err, results)
      {
      
        if(results.length > 0){ 
  
          console.log("The genre already exists for this user");
  
          db.collection('genres').findOneAndUpdate({"user_id":ObjectId(user_id)}, {$set: {"genre_id": genre_id, "genre_name": genre_name, "sample_artists": sample_artists, "sample_tracks": sample_tracks}},  function(err,doc) {
            if (err) { 
              throw err; 
              res.status(401).json(err); 
            }
  
            else { 
              console.log("Updated"); 
             res.status(200).json("Tracks has been added to user's genre"); 
            }
          });  
  
        }
  
        else{
  
          console.log("The genre does not exist for the user");
  
          //Create the genre
          const newGenre = { user_id: ObjectId(user_id), genre_id: genre_id, genre_name: genre_name, sample_artists: sample_artists, sample_tracks: sample_tracks};
  
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

      // incoming: track_id, user_id, track
      // outgoing: none

      const { track_name, track_id } = req.body;
      var user_id = req.cookies.user_id;

      insert(track_name, track_id, db, user_id, function(){
        client.close();
      });
    });

    const insert = function(track_name, track_id, db, user_id){

      var ObjectId = require('mongodb').ObjectID;

      //Create new disliked track
      const dislikedtrack = { user_id: ObjectId(user_id), track_id:track_id, track_name:track_name };

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

      // incoming: track_id, track_name, genre
      // outgoing: unknown

      const { track_id, track_name, genre } = req.body;
      var user_id = req.cookies.user_id;

      insert(track_id, track_name, genre, db, user_id, function(){
        client.close();
      });
    });

    const insert = function(track_id, track_name, genre, db, user_id){

      var ObjectId = require('mongodb').ObjectID;

      //Create new liked track
      const likedtrack = { user_id: ObjectId(user_id), track_id:track_id, track_name:track_name, genre_name:genre, };

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
  
  app.post('/api/delete_like', async (req, res) => 
  {
    client.connect (function(err)
    {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName); 

      // incoming: track_id, track, genre
      // outgoing: unknown

      const {track_name} = req.body;
      var user_id = req.cookies.user_id;

      dele(track_name, db, function(){
        client.close();
      });
    });

    const dele = function(user_id, track_name, db)
    {

      var ObjectId = require('mongodb').ObjectID;
    
          const user = db.collection('user_liked_tracks').find({"user_id": ObjectId(user_id), "track_name": track_name}).toArray(async function(err, results)
      {
        console.log("Found the following records");
        //console.log(results.length);

        //var dbo = db.db(dbName);

        if(results.length > 0){
            
         // pass = results[0]._id;
          //console.log(pass);
          //console.log(results[0].firstname); 

        db.collection("user_liked_tracks").deleteOne({"user_id": ObjectId(user_id), "track_name": track_name}, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            //db.close();
        });

          res.status(200).json("Track was founded");
        }
        else{
            return res.status(401).json({errorMessage: "Search does not exist"});
        }

      });
    
    }
   
  });
  
  
  app.post('/api/delete_dislike', async (req, res) => 
  {
    client.connect (function(err)
    {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName); 

      // incoming: track_id, track, genre
      // outgoing: unknown

      const {track_name} = req.body;
      var user_id = req.cookies.user_id;

      dele(track_name, db, function(){
        client.close();
      });
    });

    const dele = function(user_id, track_name, db)
    {

      var ObjectId = require('mongodb').ObjectID;
    
          const user = db.collection('user_disliked_tracks').find({"user_id": ObjectId(user_id), "track_name": track_name}).toArray(async function(err, results)
      {
        console.log("Found the following records");
        //console.log(results.length);

        //var dbo = db.db(dbName);

        if(results.length > 0){
            
         // pass = results[0]._id;
          //console.log(pass);
          //console.log(results[0].firstname); 

        db.collection("user_disliked_tracks").deleteOne({"user_id": ObjectId(user_id), "track_name": track_name}, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            //db.close();
        });

          res.status(200).json("Track was founded");
        }
        else{
            return res.status(401).json({errorMessage: "Search does not exist"});
        }

      });
    
    }
   
  });
  
  // Forgot Password API
  app.post('/api/forgotPassword', async (req, res, next) => 
  {
    // Find user using the email given
    const {email} = req.body;
    const db = client.db();
    resetTE = new Date();
    const forgetfulUser = await db.collection('users').find({email:email}).toArray();
    if (forgetfulUser.length <= 0)
    {
      res.status(400).json('Email does not exist.');
      return next();
    }
    const id = forgetfulUser[0]._id;
    const userEmail = forgetfulUser[0].email;
    
    // Generate reset token
    const resetToken = crypt.randomBytes(32).toString('hex');
    const encryptedResetToken = crypt.createHash('sha256').update(resetToken).digest('hex');
    resetTE.setMilliseconds(resetTE.getMilliseconds()+10*60*1000);
    db.collection('users').updateOne({_id:id}, {$set:{reset_token:encryptedResetToken, expiration_time:resetTE}});
    
    // Parameters for sending email
    const resetURL = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;
    var Options = {userEmail, resetURL};
    sendEmail(Options);
    
    var ret = {
      'Email of User':forgetfulUser[0].email, 
      //'Unencrypted reset token':resetToken,
      'Reset URL': resetURL,
      'Expiration time of the reset token':resetTE, 
      Error:''
    };
    res.status(200).json(ret);
  });
  
  // Send email function
  const sendEmail = async Options => 
  {
    // Create email connection
    var transport = nodemailer.createTransport({
      // FOR TESTING
      //host: "smtp.mailtrap.io",
      //port: 2525,
      service: "hotmail",    
      auth: {
        // user: acfbcf19fe9545
        // pass: 0be610ecf5b6b9
        user: "jumble-password-recovery@outlook.com",      
        pass: "Veryinsecurepassword"      
      }
    });
    
    // Define email params
    var mailOptions = {
      from: '"Password Recovery" <jumble-password-recovery@outlook.com>',
      to: Options.userEmail,
      subject: 'Forgotten Password? Reset it now',
      text: `Forgot your password? Follow the link below to reset the password.\nIf you did not desire to reset the password, then please disregard this email.\n\n${Options.resetURL}`,
      //text: `Just created a new account? Verify it now! \n\nFollow the link below to verify your new account and log in.\n\n${Options.resetURL}`,
      //html: '<h1>Forgot your password? </h1><p Follow the link below to reset the password.</p><p> Link will only be valid for 10 minutes</p> <a href="Options.resetURL">Will redirect you to password reset page</a> '
    };
  
    // Send email
    transport.sendMail(mailOptions, (error, info) =>
    {
      if (error) {
        console.log(error);
      }
      //console.log('Email sent: ' + info.messageId);
    });
  };
  
  // Reset Password API
  app.patch('/api/resetPassword/:token', async (req, res, next) =>
  {
    // Router /api/resetPassword/:token
    const db = client.db();
    const current = new Date();
    
    // Find and verify user via the token sent and expiration time
    const hashedToken = crypt.createHash('sha256').update(req.params.token).digest('hex');
    const findUser = await db.collection('users').findOne({reset_token:hashedToken, expiration_time:{$gt:current}});
    if (!findUser)
    {
      console.log('No user found');
      return next();
    }
  
    // Set new password
    db.collection('users').updateOne({_id:findUser._id}, {$set:{password:req.body.password, reset_token:'', expiration_time:'', password_updated_at:current}});
  
    var ret = {
      'Token attached to URL':req.params.token,
      'Desired password sent in':req.body.password, 
      //'Users new password':findUser.password, 
      Error:''
    };
    res.status(200).json(ret);
    // Log user in
  });

app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

console.log('Server listening on port ' + PORT)
app.listen(PORT);
