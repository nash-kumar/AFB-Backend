var express= require('express');
var app=express();

var UserSchema=require('./models/model');

const mongoose=require("mongoose");
require('dotenv').config()
app.use(express.json());
const cors=require('cors');
app.use(cors());
mongoose.connect(process.env.DB_URL,{useNewUrlParser: true},(err)=>{
if(err)
console.log("error");
else
console.log("success");
});

app.get('/', (req,res) => {
    res.send("WELCOME TO NODE");
});
app.listen(8080);