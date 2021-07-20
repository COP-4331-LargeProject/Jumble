var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs')

const path = require('path');           
const PORT = process.env.PORT || 5000;  

const app = express();
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

  
  app.post('/api/testing', async (req, res, next) =>
{
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
  
      // Find some documents
      db.collection('users').find().toArray(function(err, docs)
      {
        console.log("Found the following records");
        //console.log(JSON.stringify(docs.email, null, 4));
        console.log(docs[0]);
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

app.post('/api/register', async (req, res, next) =>
{
  client.connect (function(err)
  {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName); 

    // incoming: email, password 
    // outgoing: error

    const { email, password } = req.body; 

    //Check to see if email exists.
    find(password, email, db, function() 
    {
      client.close();
    });
  });
    
  const find = function(password, email, db)
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
            const newUser = { email: email, password: hash};
            var error = '';

            //Insert newUser
            try{
              db.collection('users').insertOne(newUser);
            }
            catch(e){
              error = e.toString();
            }
            
            db.collection('users').find({"email": email}).toArray(function(err, results){
                ret = { error: error, id: results[0]._id};
                console.log(ret);
                res.status(200).json(ret);
            });
        }
      });
    }
}); 

//Don't know why but to test delete all the comments to the next set of code. 
//events.js:352 throw er; // Unhandled 'error' event occurs otherwise.

//How do I grab the first and last names from this???
//Also how do I carry in the _id so we are putting this info into the correct user.

//var client_id = 'a5fd338e87224bc0a4f0b1551e17d95e'; // Your client id
//var client_secret = '036c97a0173e4e818a0562d8ac986eef'; // Your secret
//var redirect_uri = 'http://143.244.165.192:' + PORT + '/callback/'; // Your redirect uri

/////Spotify API
/*app.get('/spotify', function(req, res) {

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
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
  
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
        res.send({
          'access_token': access_token
        });
      }
    });
  });*/

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );

  next();
});

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
});

console.log('Server listening on port ' + PORT)
app.listen(PORT);
