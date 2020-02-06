const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contactSchema = new schema({
    name : {
        type: String
    },
    email : {
        type: String,
        required : true
    },
    phone : {
        type: String
    },
    message : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    }
    
})

module.exports = contact = mongoose.model('contact', contactSchema);