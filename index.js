var express= require('express');
var app=express();

var UserSchema=require('./models/model');
var UserRouter=require('./routes/route');

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

app.use('/users', UserRouter);
app.listen(4101);