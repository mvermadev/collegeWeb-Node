const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');
const rn = require('random-number');


router.use(cors());

const options = {
    min : 10000,
    max : 100000,
    integer : true
}

var ran = rn(options)

router.post('/sendOtp', (req, res)=>{
    const email = req.body.email;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'servicebird365@gmail.com',
            pass : 'b-i-r-deservices'
        }
    });

    const mailOptions = {
        from: 'ServiceBird 365',
        to: email,
        subject : 'OTP',
        text : 'Hey ' + ', Your OTP verfication is : ' + ran + ' for E-service Website Registration process'
    }

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log('Email is sended');
            res.end();
        }
    })
    res.end();
})

router.post('/otpAuth', (req, res)=>{
    const otp = req.body.otp;
    
    if(otp == ran)
    {
        console.log('otp succed');
    }
    else
    {
        console.log('Invalid OTP');
    }
    res.end();
})

module.exports = router