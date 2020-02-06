const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');
const Contact = require('../models/contact');
router.use(cors());
// const contactModel = mongoose.model('contact');

router.post('/query', (req, res)=>{
    const today = new Date();
    const contactData = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        message : req.body.message,
        created : today
    }
    console.log(req.body);
    Contact.create(contactData)
    .then((user)=>{
        console.log('data stored.');
        res.json({status : user.email + " message added"});
    }).
    catch(err=>{
        res.send('error ' + err)
    })

    // Send Email as well.
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'servicebird365@gmail.com',
            pass : 'b-i-r-deservices'
        }
    });

    const mailOptions = {
        from: 'ServiceBird 365',
        to: contactData.email,
        subject : 'E-Services Response',
        // text : 'Hey ' + contactData.name + ', we received your message and now we reply you as soon as possible. Your Message: [' + contactData.message + '].'
        text : `Hey ${contactData.name}, we received your message and now we reply you as soon as possible. \n \n Your Message: \n ${contactData.message} \n \n Thank you for join us.`
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

module.exports = router