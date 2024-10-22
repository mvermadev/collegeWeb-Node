const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');

const UserInfo = require('../models/userInfo');
const UserFb = require('../models/userFb')
router.use(cors());

router.post('/addUser/:userId/:name/:email/:phone', (req, res)=>{

    const today = new Date();
    const userData = {
        userId : req.params.userId,
        name : req.params.name,
        email : req.params.email,
        phone : req.params.phone,
        created : today
    }
    
// Store user Data, uniquely.
    UserInfo.findOne({
        email : userData.email
    })
    .then(user =>{
        if(!user)
        {
            UserInfo.create(userData)
            .then(user =>{
                res.json({ status : user.email + " Registered"})
                
                // Send Email as well.
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
            user: '', // Your Email.
            pass : '' // Your Password.
                    }
                });

                const mailOptions = {
                    from: 'ServiceBird 365',
                    to: userData.email,
                    subject : 'E-Services Response',
                    // text : 'Hey ' + contactData.name + ', we received your message and now we reply you as soon as possible. Your Message: [' + contactData.message + '].'
                    text : `Hey ${userData.name}, Welcome in our family which is top leading services provider company in market.

                    Thank you, to register your crucial informatin to us. We provide you great service as much as possible.
                    
                    Regards,
                    FOUNDER: Manish Verma.
                `
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
            .catch(err =>{
                res.send('error ' + err);
            })
        }
        else
        {
            res.json({err : "User already exist."})
        }
    })
    .catch(err=>{
        res.send('error ' + err)
    });
    
})

router.get('/fetchUser/:email', (req, res)=>{
    const emailVal = req.params.email;

    UserInfo.find({ email: emailVal})
    .then((data)=>{
        console.log('userDetails data received')
        res.json({data});
    }).
    catch(err=>{
        console.log('Error fom retrieve Details : ', err)
    })
})


// Update User Information.
router.post('/updateUser/:id/:email/:field/:newValue', (req, res)=>{
    // const newValue = req.params.newValue;
    
    const today = new Date();
    const userData = {
        myuserId : req.params.id,
        email : req.params.email,
        field : req.params.field,
        newValue : req.params.newValue,
    }

    const query = {userId : userData.myuserId}

    const objValue = {};
    objValue[userData.field] = userData.newValue;

    
    // console.log(req.body);
    console.log(query)
    console.log(objValue)
    
    UserInfo.updateOne(query, { $set : objValue }, 
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
   //       user: '', // Your Email.
     //      pass : '' // Your Password.
    //     }
    // });

    // const mailOptions = {
    //     from: 'ServiceBird 365',
    //     to: userData.email,
    //     subject : 'E-Services Response',
    //     // text : 'Hey ' + contactData.name + ', we received your message and now we reply you as soon as possible. Your Message: [' + contactData.message + '].'
    //     text : `Hey ${userData.name}, you had recently updated your information.
            
    //     name : ${userData.name},
    //     phone : ${userData.phone},
    //     email : ${userData.email},
    //     city : ${userData.city},
    //     pincode : ${userData.pincode},
    //     state : ${userData.state},
    //     service : ${userData.service},
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


// Update User Information.
router.post('/userfeedback/:refno/:name/:email/:service/:msg', (req, res)=>{
    
    const today = new Date();
    const userFbData = {
        userId : req.params.refno,
        name : req.params.name,
        email : req.params.email,
        service : req.params.service,
        feedback : req.params.msg,
        created : today
    }

    UserFb.create(userFbData)
    .then((user)=>{
        console.log('data stored.');
        res.json({status : user.email + " Feedback added"});
   
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
        to: userFbData.email,
        subject : `${userFbData.service} Service Feedback`,
        // text : 'Hey ' + contactData.name + ', we received your message and now we reply you as soon as possible. Your Message: [' + contactData.message + '].'
        text : `Hey ${userFbData.name}, we received your previous ${userFbData.service} booked service Feedback.\nNow, We have to evaluate your feedback. which is "${userFbData.feedback}".\nIf, there are any improvement then we will work hard to implement them.\n\nThank you to join us.`
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
