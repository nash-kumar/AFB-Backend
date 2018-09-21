const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
app.use(express.json());
mongoose.Promise = global.Promise;
const cors = require('cors');
app.use(cors());

app.set('secretkey', 'nodeRestApi')

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true},(err) => {
    if(err) console.log('Could not Connect');
    else console.log("SuccessFully Connected");
});

const user = require('./routing/route');

app.get('/', (req, res) => {
    res.send("WELCOME TO NODE");
});

app.use('/user', user)

function validateUser(req,res,next) {
    jwt.verify(req.headers['x-accesss-token'],req.app.get('secertKey'),function(err,decoded) {
        if(err){
            res.json({status:"error",message:err.message,data:null});
        }else{
            req.body.userId =decoded.id;
            next();
        }
    });
}
//express does not consider
app.use((req, res, next) => {
    let err = new Error('Not Error');
    err.status = 404;
    next(err);
});
//handling error
app.use((err, req, res, next)=>{
    console.log(err);

    if(err.status === 404)
        res.status(404).json({message: "User not found"});
    else
        res.status(500).json({message:"Something"});
});


PORT = process.env.PORT;
app.listen(PORT, () => console.log(`At ${PORT} port is running!`));
