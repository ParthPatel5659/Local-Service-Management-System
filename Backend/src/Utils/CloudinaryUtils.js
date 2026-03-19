const cloudinary= require("cloudinary").v2;

require("dotenv").config()

const uploadTocloudinary= async(path)=>{

    cloudinary.config({
        
    })
    const res = await cloudinary.uploader.upload(path)
    return res
}

module.exports=uploadTocloudinary