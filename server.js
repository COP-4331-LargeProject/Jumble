//If you are having issues with server.js not running and there is not an error then run "killall node" then try again.

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

app.post('/api/register', async (req, res, next) =>
{
  client.connect (function(err)
  {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName); 

    // incoming: email, password 
    // outgoing: error or error and userID

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

        //If email already exists then do not sign up.
        if(results.length > 0){
          ret = { error: "Email is already in use." };
          console.log(ret);
          res.status(200).json(ret);
        }

        //Else sign up the user
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




app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
});

console.log('Server listening on port ' + PORT)
app.listen(PORT);
