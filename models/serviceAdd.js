const mongoose = require('mongoose');
const schema = mongoose.Schema;

const serviceAddSchema = new schema({
    name : {
        type: String
    },
    email : {
        type: String,
        required : true
    },
    phone : {
        type: String,
    },
    Address : {
        type: String,
    },
    city : {
        type: String,
    },
    pincode : {
        type: String
    },
    state : {
        type: String
    },
    place : {
        type: String,
    },
    serviceType : {
        type: String,
    },
    created : {
        type: Date,
        default: Date.now
    }
    
})

module.exports = serviceAdd = mongoose.model('serviceAdd', serviceAddSchema);