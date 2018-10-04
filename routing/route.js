const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/model').userModel;
const async = require('async');
const nodemailer = require('nodemailer');
const crypto=require('crypto');
const xoauth2=require('xoauth2');

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
    const email = req.body.data.email;
    var password = req.body.password;

    userModel.findOne({ email: req.body.data.user.email }, function (err, userInfo) {

        if (err) {
            next(err);
        } if (userInfo) {
            if (bcrypt.compareSync(req.body.data.user.password, userInfo.password)) {
                const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                res.json({ success: true, message: "user found!!!", data: { user: userInfo, token: token } });
            } else {
                res.json({ success: false, message: "Invalid email/password!!!" });
            }
        }
        if (!userInfo) {
            res.json({ success: false, message: "Invalid email/password!!!" });
        }


    });
});
router.post('/forgot', function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            userModel.findOne({ email: req.body.data.user.email }, function (err, user) {
                if (!user) {
                    // req.flash('error', 'No account with that email address exists.');
                    // return res.redirect('/forgot');
                    res.json({ success: false, message: "No account with that email address exists." });
                }
       
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                        user: 'accionlabs136@gmail.com',
                        pass: 'accion136'
                }
            });
            var mailOptions = {
                to: req.body.data.user.email,
                from: 'accionlabs136@gmail.com',
                subject: 'Reset your password!',
                text: 'You are receiving this mail because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + 'localhost:4200/forgot' + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err,res) {
               if(err){
                   console.log('Error',err);
               } else{
                   console.log('Email Sent');
               }
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
});

router.get('/reset/:token', function(req, res) {
    userModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        res.json({ success: false, message: "Password reset token is invalid or has expired"});
        }
      
    });
  });

  router.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        userModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            res.json({success:false ,message:'Password reset token is invalid or has expired.'});
            // return res.redirect('back');
          }
  
          user.password = req.body.data.user.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
  
          
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
          auth: {
            user: 'accionlabs136@gmail.com',
            pass: 'accion136'
          }
        });
        var mailOptions = {
          to: req.body.data.user.email,
          from: 'accionlabs136@gmail.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function (err,res) {
            if(err){
                console.log('Error',err);
            } else{
                console.log('Email Sent');
            }
         });
     }
    ], function(err) {
      res.redirect('/');
    });
  });

  router.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        userModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            res.json({success:false, message:'Password reset token is invalid or has expired.'});
            return res.redirect('back');
          }
  
          user.password = req.body.data.user.password;
        //   user.resetPasswordToken = undefined;
        //   user.resetPasswordExpires = undefined;

          user.save(function (err) {
            done(err,user);
        });
         user=user.email;
          
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport( {
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            auth:  {
            user: 'accionlabs136@gmail.com',
            pass: 'accion136'
          }
        });
        var mailOptions = {
          to: user,
          from: 'accion136@gmail.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err,res) {
            if(err){
                console.log('Error',err);
            } else{
                console.log('Email Sent');
            }
        });
      }
    ],);
  });

router.get('/list', function (req, res, next) {
    let query = userModel.find({});
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
    userModel.findByIdAndRemove({ emp_id: req.params.emp_id }, (err, result) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Unable to Delete!"
            })
        } else {
            res.status(200).send({
                success: true,
                message: "Success!"
            })
        }
    })
})