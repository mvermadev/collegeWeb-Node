const mongoose = require('mongoose');
const schema = mongoose.Schema;

const partnerRegisSchema = new schema({
    name : {
        type: String
    },
    phone : {
        type: String,
    },
    email : {
        type: String,
        required : true
    },
    city : {
        type: String,
        required: true
    },
    pincode : {
        type: String
    },
    state : {
        type: String
    },
    service : {
        type: String,
        required: true
    },
    partnerId : {
        type: String,
    },
    created : {
        type: Date,
        default: Date.now
    }
    
})

module.exports = partnerRegis = mongoose.model('partnerRegis', partnerRegisSchema);