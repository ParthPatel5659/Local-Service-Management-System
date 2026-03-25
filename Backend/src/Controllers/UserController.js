const userSchema= require('../Models/UserModel');
const bcrypt = require('bcrypt');
const mailSend = require('../Utils/MaliUtils');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

const registerUser = async (req,res)=>{
    try{
         const hashedPassword = await bcrypt.hash(req.body.password,10);
        const savedUser = await userSchema.create({...req.body,password:hashedPassword});
        await mailSend(savedUser.email,"Welcome to our localservice","thank you for join our app")
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

                // const token=jwt.sign(foundUserFromMail.toObject(),jwtSecret,{expiresIn:60*24*7})
                const token=jwt.sign({id:foundUserFromMail._id},jwtSecret)
                res.status(201).json({
                    message:"login sucssfully",
                //    data:foundUserFromMail,
                    token:token,
                    userId : foundUserFromMail._id,
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

//update user by id

const updateUserById=async(req,res)=>{
    try{
        const updateUser= await userSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json({
            message:"user update successfully",
            data:updateUser
        })
    }catch(error){
        res.status(500).json({
            message:"error while updating user",
            err:error
        })
    }
}

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




module.exports = {
    registerUser,
    loginUser,
    updateUserById,
    deleteUserById,
    getallUser
}