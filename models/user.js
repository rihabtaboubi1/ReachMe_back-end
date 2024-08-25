const mongoose = require('mongoose');


const User = mongoose.model('User' , {

    name: {
        type: String
    },
    lastname: {
        type: String

    },
    email: {
        type: String
    },
   
    telephone_number: {
        type: Number
    },

    notes: {
        type: String
    },
    image: {
        type: String

    },

})

module.exports = User;  