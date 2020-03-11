const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userFbSchema = new schema({
    userId : {
        type: String
    },
    name : {
        type: String
    },
    email : {
        type: String
    },
    service : {
        type: String
    },
    feedback : {
        type: String
    },
    created : {
        type: Date,
        default: Date.now
    }
    
})

module.exports = userInfo = mongoose.model('userFb', userFbSchema);