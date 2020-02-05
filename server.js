const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))

let router = require('./routes/otp');
app.use('/users',router);

// app.get('/', (req, res)=>{
//     console.log('responding to routes');
//     res.send('your nodejs is connected')
// })

app.listen(1111, ()=>{
    console.log(`serving is running on port 1111`);
})