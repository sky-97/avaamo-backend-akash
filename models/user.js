const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    photoUrl : {
        type : String,
        required : false,
    },
    name : {
        type : String,
        required : true,  
        unique : true,      
    },

    label : {
        type : String,
        required : false,  
    },
    type :{
        type : String,
        required : true
    },
    
})



module.exports = mongoose.model('User', userSchema )