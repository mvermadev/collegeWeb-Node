const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');

const PartnerReg = require('../models/partnerReg');
router.use(cors());
// const contactModel = mongoose.model('contact');

router.post('/partnerRegisteration', (req, res)=>{
    const today = new Date();
    const partnerData = {
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        city : req.body.city,
        pincode : req.body.pincode,
        state : req.body.state,
        service : req.body.service,
        partnerId : req.body.partnerId,
        created : today
    }
    console.log(req.body);
    PartnerReg.create(partnerData)
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
            pass : 'b-i-r-d1997eservices'
        }
    });

    const mailOptions = {
        from: 'ServiceBird 365',
        to: partnerData.email,
        subject : 'E-Services Response',
        // text : 'Hey ' + contactData.name + ', we received your message and now we reply you as soon as possible. Your Message: [' + contactData.message + '].'
        text : `Hey ${partnerData.name}, we received your request to become our partner or family in this top leading e-service company.\n\nWhat Next? \nNow, we will evaluate your information which you had submitted for "${partnerData.service}" service, then we will contact you to invite in final register to become our best working partner.\nThese whole process take 1-3 business days.\n\nThank you to join us.`
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


router.get('/partnerDetails/:email', (req, res)=>{
    const emailVal = req.params.email;

    PartnerReg.find({ email: emailVal})
    .then((data)=>{
        console.log('userDetails data received')
        res.json({data});
    }).
    catch(err=>{
        console.log('Error fom retrieve Details : ', err)
    })

})

// Update Partner Information.
router.post('/updatePartner/:id/:email/:field/:newValue', (req, res)=>{
    // const newValue = req.params.newValue;
    
    const today = new Date();
    const partnerData = {
        mypartnerId : req.params.id,
        email : req.params.email,
        field : req.params.field,
        newValue : req.params.newValue,
    }

    const query = {partnerId : partnerData.mypartnerId}

    const objValue = {};
    objValue[partnerData.field] = partnerData.newValue;

    
    // console.log(req.body);
    console.log(query)
    console.log(objValue)
    
    PartnerReg.updateOne(query, { $set : objValue }, 
    (err, raw)=>{
        if(err)
        {
            res.send('Err to update')
        }
        else
        {
            console.log(raw)
        }
    });

      // Send Email as well.
    //   const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'servicebird365@gmail.com',
    //         pass : 'b-i-r-deservices'
    //     }
    // });

    // const mailOptions = {
    //     from: 'ServiceBird 365',
    //     to: partnerData.email,
    //     subject : 'E-Services Response',
    //     // text : 'Hey ' + contactData.name + ', we received your message and now we reply you as soon as possible. Your Message: [' + contactData.message + '].'
    //     text : `Hey ${partnerData.name}, you had recently updated your information.
            
    //     name : ${partnerData.name},
    //     phone : ${partnerData.phone},
    //     email : ${partnerData.email},
    //     city : ${partnerData.city},
    //     pincode : ${partnerData.pincode},
    //     state : ${partnerData.state},
    //     service : ${partnerData.service},
    //     `
    // }

    // transporter.sendMail(mailOptions, (err, info)=>{
    //     if(err)
    //     {
    //         console.log(err);
    //     }
    //     else
    //     {
    //         console.log('Email is sended');
    //         res.end();
    //     }
    // })
    res.end();

})

module.exports = router