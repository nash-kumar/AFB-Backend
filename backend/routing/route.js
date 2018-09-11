const express = require('express');
const router = express.Router();
const userModel = require('../model/model').userModel;
module.exports = router;

router.post('/add', (req, res) => {
    console.log('POST IS WORKING!');
    if (req.body.data) {
        const user = userModel({
            name: req.body.data.name,
            designation: req.body.data.designation,
            place: req.body.data.place,
            salary: req.body.data.salary,
            phoneno: req.body.data.phoneno
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