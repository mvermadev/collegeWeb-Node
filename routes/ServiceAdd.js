const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs')

const ServiceAdd = require('../models/serviceAdd');
const partnerReq = require('../models/partnerReg');
router.use(cors());
// const contactModel = mongoose.model('contact');

// Sending data.
router.post('/serviceAddress', (req, res)=>{
    const today = new Date();
    const serviceData = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        address1 : req.body.address1,
        address2 : req.body.address2,
        city : req.body.city,
        pincode : req.body.pincode,
        state : req.body.state,
        place : req.body.place,
        serviceType : req.body.serviceType,
        subService : req.body.subService,
        referenceNo : req.body.referenceNo,
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
            subject : `${serviceData.serviceType} ${serviceData.subService} Service`,
            // text : 'Hey ' + contactData.name + ', we received your message and now we reply you as soon as possible. Your Message: [' + contactData.message + '].'
            text : `Hey ${serviceData.name}, we received your booking request for ${serviceData.subService}. which are came in ${serviceData.serviceType} service and your reference no is ${serviceData.referenceNo} service.\n\nWhat Next? \nNow, we will evaluate your information which you had submitted for "${serviceData.subService}" service.\n\nThank you to join us.`
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


// Display Recent Order Details.
router.get('/retDetails/:serValue/:refValue', (req, res)=>{
    const refValue = req.params.refValue;
    const serValue = req.params.serValue;
    ServiceAdd.find({ referenceNo: refValue})
    .then((data)=>{
        console.log('userDetails data received')
        res.json({data});
    }).
    catch(err=>{
        console.log('Error fom retrieve Details : ', err)
    })
})


//Task: 
    // 1. send email to user if partner not exist.
    // 2. fetch email of user in below URL.


// Send email to specific partner.
router.get('/specPartner/:name/:email/:address1/:address2/:cityValue/:pincode/:state/:contact/:serValue/:subSer', (req, res)=>{
    const name = req.params.name;
    const userEmail = req.params.email;
    const address1 = req.params.address1;
    const address2 = req.params.address2;
    const pincode = req.params.pincode;
    const state = req.params.state;
    const contact = req.params.contact;
    const serValue = req.params.serValue;
    const subSer = req.params.subSer;
    const cityValue = req.params.cityValue;

      // Send Email to specific Service-Partner as well.
      partnerReq.findOne({service: serValue})
      .then(partner=>{
          if(partner)
          {
  
             console.log('partner email : ', partner.email)
              res.json(partner.email)
              // res.send(partner.email)
              
              const partEmail = partner.email;
  
            // Send Email, If Partner exists.
                  const transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                          user: 'servicebird365@gmail.com',
                          pass : 'b-i-r-deservices'
                      }
                  });
  
                  const mailOptions = {
                      from: 'ServiceBird 365',
                      to: partEmail,
                      subject : `${serValue}, ${subSer} Job`,
                      // text : 'Hey ' + contactData.name + ', we received your message and now we reply you as soon as possible. Your Message: [' + contactData.message + '].'
                      text : `Hey ${partner.name}, we received a service which is relevent to your to sevice is "${serValue}, ${subSer}" and the location is ${cityValue}, If you want to grabs that deal then we provide you some useful customer information below to connect with them.
                    
                        Name: ${name},
                        address1 : ${address1},
                        address2: ${address2},
                        cityValue: ${cityValue},
                        pincode: ${pincode},
                        state : ${state},
                        contact: ${contact},
                        Require Service: ${serValue}, ${subSer}.
                      `
                  }
  
                  transporter.sendMail(mailOptions, (err, info)=>{
                      if(err)
                      {
                          console.log(err);
                      }
                      else
                      {
                          console.log('Email is sended to specific partner');
                          res.end();
                      }
                  })
          }
          else{
            //   res.json({err: "partner does not exist"})
            //   res.send("partner does not exist")

            // if, Partner doesnt exist then send "SORRY" mail.
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'servicebird365@gmail.com',
                    pass : 'b-i-r-deservices'
                }
            });

            const mailOptions = {
                from: 'ServiceBird 365',
                to: userEmail,
                subject : `Sorry, for ${subSer} Service`,
                // text : 'Hey ' + contactData.name + ', we received your message and now we reply you as soon as possible. Your Message: [' + contactData.message + '].'
                text : `Hey ${name}, we received your request for ${subSer} service.\n\nWe regrets, that your required service is not available because of deficiency of ${subSer} service partner.
                `
            }

            transporter.sendMail(mailOptions, (err, info)=>{
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log('Email is sended to specific partner');
                    res.end();
                }
            })
          }
      }).
      catch(err=>{
          console.log('Error from specific partner : ', err);  
          })
})


// Display Order Details of existing User.
router.get('/userOrders/:email/', (req, res)=>{
    const email = req.params.email;
    ServiceAdd.find({ email: email})
    .then((data)=>{
        console.log('userDetails data received')
        res.json(data);
        var jsonContent = JSON.stringify({data})
        console.log(jsonContent)

        // fs.writeFile("./CollegeWeb-React/src/pages/Registeration/UserAccount/orderData.json", jsonContent, 'utf8', (err)=>{
        //     if(err)
        //     {
        //         console.log('Err to save orderedData in JsonFile : ',err)
        //     }
        //     console.log("JSON file saved")
        // })

    }).
    catch(err=>{
        console.log('Error fom retrieve Details : ', err)
    })
})


module.exports = router