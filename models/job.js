const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    },
    status : {
        type : String,
        required : true,        
    },
    notifications :{
        type : Object,
        required : true
    },
    timezone : {
        type : String,
        required : false,  
    },
    request :{
        type : Object,
        required : true
    },
    request_interval_seconds : {
        type : Number,
        required : true
    },
    tolerated_failures : {
        type : Number,
        required : false,
        default : null
    },
    created : {
        type : Date, 
        default: Date.now,
        required : true,
                
    },
    updated : {
        type : Date, 
        required : false,      
    },
    enable : {
        type : Boolean,
        required : false, 
        default : false,   
    },
    trigger : {
        type : Boolean,
        required : false, 
        default : false,   
    }
})



module.exports = mongoose.model('Job', jobSchema )