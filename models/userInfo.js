const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    userId : {
        type: String
    },
    name : {
        type: String
    },
    email : {
        type: String
    },
    phone : {
        type: String
    },
    created : {
        type: Date,
        default: Date.now
    }
    
})

module.exports = userInfo = mongoose.model('userInfo', userSchema);