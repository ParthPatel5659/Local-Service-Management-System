const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Firstname:{
        type:String,
        required:true
    },
    Lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user',
        enum:['user','Service Provider','Admin']
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    profilePicture:{
        type:String,
    },
   status:{
    type:String,
    default:'active',
    enum:['active','inactive','deleted','blocked']
   }  
},{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)
