const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contactSchema = new schema({
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
    state : {
        type: String
    },
    service : {
        type: String,
        required: true
    },
    created : {
        type: Date,
        default: Date.now
    }
    
})

module.exports = contact = mongoose.model('contact', contactSchema);