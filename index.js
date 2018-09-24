const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
app.use(express.json());
const cors = require('cors');
const jwt=require('jsonwebtoken');
app.set('secretKey', 'nodeRestApi'); 
app.use(cors());

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true},(err) => {
    if(err) console.log('Could not Connect');
    else console.log("SuccessFully Connected");
});

const user = require('./routing/route');

app.get('/', (req, res) => {
    res.send("WELCOME TO NODE");
});

app.use('/user', user)

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
    
  }

PORT = process.env.PORT;
app.listen(PORT, () => console.log(`At ${PORT} port is running!`));
