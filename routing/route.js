const express = require('express');
const router = express.Router();
const userModel = require('../model/model').userModel;
module.exports = router;

router.post('/register', (req, res) => {
    console.log('POST IS WORKING!');
    if (req.body.data) {
        const user = userModel({
            firstname: req.body.data.firstname,
            surname: req.body.data.surname,
            mobile: req.body.data.mobile,
            email: req.body.data.email,
            dob: req.body.data.dob,
            password: req.body.data.password,
            emp_id: req.body.data.emp_id,
            gender: req.body.data.gender
        });
        user.save((err, result) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err.message
                });
            } else if (result) {
                res.status(200).send({ success: true, message: "Data added successfully", result });
            }
        });
    } else {
        res.status(400).json({
            message: 'Please Enter any DATA!'
        });
    }
});

router.post('/login', (req, res) => {
       
        var email = req.body.data.email;
        var password = req.body.data.password;
   
    userModel.findOne({email: email, password: password}, (err, user) => {
        if(err){
            return res.status(500).send();
        }
        if(!user){
            return res.status(404).send({ success:false , message:"User or Password Did not match!"})
        }else
        return res.status(200).send({ success:true , message:"Successfuly logged In"})
    })
})

router.get('/:id', (req, res) => {
    console.log('GET IS WORKING!');
    userModel.findOne({ id: req.params.id }, (err, result) => {
        if (err || result === null) {
            res.status(404).send({ success: false, message: 'User not found' })
        } else {
            res.status(200).send({ success: true, message: 'Success!', result })
        }
    });
});

router.get('/', (req, res) => {
    console.log('GET IS WORKING!');
    userModel.find((err, result) => {
        if (err) {
            res.status(404).send({ success: false, message: 'Users Not Found' });
        } else {
            res.status(200).send({ success: true, message: 'Success!', result });
        }
    });
});

router.get('/list', function (req, res, next) {
    let query = UserSchema.find({});
    query.exec((err, user) => {
        if (err) {
            res.send(err);

        } else {
            res.json({ user });
        }
    })
});

router.get('/:name', (req, res) => {
    UserSchema.findOne({ name: req.params.name }, (err, result) => {
        if (err || result === null) {
            res.status(404).send({ sucees: false, message: "User Not Found" })
        } else {
            res.status(200).send({ sucess: true, message: "Succesfully fetched user details", result });
        }
    })
});

router.delete('list/:name', (req, res) => {
    UserSchema.remove({ name: req.params.name }, (err, doc) => {
        if (err) {
            res.status(500).send({ success: false, message: "Unable to delete the user" });
        } else {
            res.status(200).send({ success: true, message: "Succesfully deleted the user", result: doc });
        }
    })
});



router.patch('/:id', (req, res) => {
    console.log('PATCH IS WORKING!');
    userModel.findOneAndUpdate({ id: req.params.id }, req.body.data, { new: true }, (err, result) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "unable to fetch!"
            })
        } else {
            res.status(200).send({
                success: true,
                message: "Success!",
                result
            })
        }
    })
});

router.delete('/:emp_id', (req, res) => {
    userModel.findByIdAndRemove({emp_id: req.params.emp_id}, (err, result)=>{
        if (err){
            res.status(500).send({
                success: false,
                message: "Unable to Delete!"
            })
        }else{
            res.status(200).send({
                success:true,
                message: "Success!"
            })
        }
    })
})