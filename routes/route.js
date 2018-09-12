var express = require('express');
var router = express.Router();
var UserSchema =require("../models/model")

router.get('/', (req,res) => {
    res.send("WELCOME TO NODE");
});


router.get('/list', function(req, res, next) {
    let query =UserSchema.find({});
    query.exec((err,user)=>{
        if(err){
            res.send(err);

        }else {
            res.json({user});
        }
    })});

    router.get('/:name', (req, res) => {
        UserSchema.findOne({name: req.params.name}, (err, result) => {
        if (err || result === null) {
        res.status(404).send({sucees: false, message: "User Not Found"})
        } else {
        res.status(200).send({sucess: true, message: "Succesfully fetched user details", result});
        }
        })
        });

        router.delete('list/:name', (req, res) =>{
            UserSchema.remove({name: req.params.name}, (err, doc) => {
            if (err) {
            res.status(500).send({success: false, message: "Unable to delete the user"});
            } else {
            res.status(200).send({success: true, message: "Succesfully deleted the user", result: doc});
            }
            })
            });
        

    module.exports = router;