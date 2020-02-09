const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');

const ServiceAdd = require('../models/serviceAdd');
router.use(cors());
// const contactModel = mongoose.model('contact');

router.post('/serviceAddress', (req, res)=>{
    const today = new Date();
    const serviceData = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        address : req.body.address,
        city : req.body.city,
        pincode : req.body.pincode,
        state : req.body.state,
        place : req.body.place,
        serviceType : req.body.serviceType,
        created : today
    }
    console.log(req.body);
    ServiceAdd.create(serviceData)
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
        to: serviceData.email,
        subject : `${serviceData.serviceType} Service`,
        // text : 'Hey ' + contactData.name + ', we received your message and now we reply you as soon as possible. Your Message: [' + contactData.message + '].'
        text : `Hey ${serviceData.name}, we received your booking request for ${serviceData.serviceType} service.\n\nWhat Next? \nNow, we will evaluate your information which you had submitted for "${serviceData.serviceType}" service, then we will contact you to invite in final register to become our best working partner.\nThese whole process take 1-3 business days.\n\nThank you to join us.`
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