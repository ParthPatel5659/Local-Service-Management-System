const userSchema= require('../Models/UserModel');
const bcrypt = require('bcrypt');
const mailSend = require('../Utils/MaliUtils');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const uploadToCloudinary=require("../Utils/CloudinaryUtils")

const registerUser = async (req,res)=>{
    try{
         const hashedPassword = await bcrypt.hash(req.body.password,10);
        const savedUser = await userSchema.create({...req.body,password:hashedPassword});
        await mailSend(savedUser.email,"Welcome to our app","welcome.html")
        res.status(201).json({message:'user created successfully',data:savedUser})

    }catch(error){
        console.log(error);
        
        res.status(500).json({message:'user creating error',error:error.message})
    }
}

const loginUser= async(req,res)=>{
    try {
        const {email,password}=req.body;
        const foundUserFromMail= await userSchema.findOne({email:email})
        console.log(foundUserFromMail)
        if(foundUserFromMail){
            const ispasswordmatched= await bcrypt.compare(password,foundUserFromMail.password)
            if(ispasswordmatched){

                const token=jwt.sign(foundUserFromMail.toObject(),jwtSecret,{expiresIn:60*24*7})
                // const token=jwt.sign({id:foundUserFromMail._id},jwtSecret,)
                res.status(201).json({
                    message:"login sucssfully",
                //    data:foundUserFromMail,
                    token:token,
                    role:foundUserFromMail.role
                })
            }
            else{
                res.status(401).json({
                    message:"invalid password"
                })
            }
        }else{
            res.json({
                message:"User Not Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"error while login user",
            err:error
        })
    }
}

//get profile
const getProfile = async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id).select("-password");

    res.status(200).json({
      message: "Profile fetched",
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
      error: error.message,
    });
  }
};

//update profile by id

const updateProfile = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // Only upload to Cloudinary if a file was actually provided
    if (req.file && req.file.path) {
      const cloudinaryResponse = await uploadToCloudinary(req.file.path);
      console.log("cloudinaryResponse", cloudinaryResponse);
      updateData.profilePicture = cloudinaryResponse.secure_url;
    }

    const updatedUser = await userSchema.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated",
      data: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      error: error.message,
    });
  }
};

//delete user by id

const deleteUserById= async(req,res)=>{
    try {
        const deleteUser= await userSchema.findByIdAndDelete(req.params.id)
        res.json({
            message:"user delete successfully",
            data:deleteUser
        })
    } catch (error) {
        res.status(500).json({
            message:"error while deleting user",
            err:error
        })
    }
}

//get all user

const getallUser=async(req,res)=>{
    try {
       const allUser= await userSchema.find() 
         res.json({
            message:"all user get successfully",
            data:allUser
        })

    } catch (error) {
        res.status(500).json({
            message:"error while getting all user",
            err:error
        })
    }
}

//get user
const getByUser=async(req,res)=>{
    try {
        const getByUser=await userSchema.find({role:"user"})
          res.json({
            message:" user get successfully",
            data:getByUser
        })
    } catch (error) {
          res.status(500).json({
            message:"error while getting user",
            err:error
        })
    }
}

// get provider
const getByProvider=async(req,res)=>{
    try {
        const getByProvider=await userSchema.find({role:"provider"})
          res.json({
            message:" provider get successfully",
            data:getByProvider
        })
    } catch (error) {
          res.status(500).json({
            message:"error while getting provider",
            err:error
        })
    }
}


const forgotPassword=async(req,res)=>{
    const{email}=req.body;
    if(!email){
        return res.status(400).json({
            message:"email is not provide"
        })
    }

    const foundUserFromEmail= await userSchema.findOne({email:email})
    if(foundUserFromEmail){
        //token genrate
        const token=jwt.sign(foundUserFromEmail.toObject(),jwtSecret,{expiresIn:60*10})
        //reset link
        const url=`${process.env.FRONTEND_URL}/resetpassword/${token}`
        //send mail
         const mailtext = `<html>
            <a href ='${url}'>RESET PASSWORD</a>
        </html>`
         await mailSend(foundUserFromEmail.email,"Reset Password Link","forgotPassword.html", token)
        res.status(200).json({
            message:"reset link has been sent to your email"
        })
    }
    else{
        res.status(404).json({
            message:"user not found.."
        })
    }
    }


const resetPassword=async(req,res)=>{
    const{newPassword,token}=req.body;

    try {
        const decodedUser=jwt.verify(token,jwtSecret)
        const hashedPassword= await bcrypt.hash(newPassword,10)
        const updatedUser=await userSchema.findByIdAndUpdate(decodedUser._id,{password:hashedPassword})

        res.status(200).json({
            message:"Password reset succesfully",
            // data:updatedUser
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message:"Server error",
            err:error
        })
    }
}

// ✅ GET SINGLE USER
const getUserById = async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ UPDATE USER
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = {
    registerUser,
    loginUser,
    updateProfile,
    deleteUserById,
    getallUser,
    getByUser,
    getByProvider,
    forgotPassword,
    resetPassword,
    getProfile,
    getUserById,
    updateUser
}