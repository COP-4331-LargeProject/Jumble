import db_find from '../db_find';

const express = require('express');
const cors = require('cors');

const path = require('path');           
const PORT = process.env.PORT || 3001;;  

const app = express();
app.set('port', (process.env.PORT || 3001));
const bcrypt = require('bcryptjs')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/register', async (req, res, next) =>
{

  // incoming: email, password
  // outgoing: error

  const { email, password } = req.body;

  //Create newUser with a hashed password
  const newUser = { email: email, password: bcrypt.hashSync(password, bcrypt.genSaltSync())};
  var error = '';

  //Connect to database and insert newUser
  try{
    const db = client.db(dbName);
    const results = await db.collection('users').insertOne(newUser);
  }
  catch(e){
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

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

app.listen(PORT, () => {  console.log('Server listening on port ' + PORT);});
