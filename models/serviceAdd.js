const mongoose = require('mongoose');
const schema = mongoose.Schema;

const serviceAddSchema = new schema({
    name : {
        type: String
    },
    email : {
        type: String,
    },
    phone : {
        type: String,
        required : true
    },
    address1 : {
        type: String,
    },
    address2 : {
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
    subService : {
        type: String,
    },
    referenceNo : {
        type: String,
        required: true
    },
    created : {
        type: Date,
        default: Date.now
    }
    
})

module.exports = serviceAdd = mongoose.model('serviceAdd', serviceAddSchema);