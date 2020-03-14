const mongoose = require('mongoose');
schema =  mongoose.Schema
//user model
const userSchema = new schema({
    userType:{
        type: String
    },
    first_name:{
        type: String,
        required: true  
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    DOB:{
        type: String
    },
    location:{
        type: String
    },
    Gender:{
        type:String
    },
    userType:{
        type: String
    },
    created:{
        type: Date
    },
    owned:[{
        type: schema.Types.ObjectId, 
        ref: 'products'
    
    }]
})
module.exports= mongoose.model('user', userSchema);