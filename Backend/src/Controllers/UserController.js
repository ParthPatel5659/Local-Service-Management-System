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

                const token=jwt.sign(foundUserFromMail.toObject(),jwtSecret)
                // const token=jwt.sign({id:foundUserFromMail._id},jwtSecret)
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
module.exports = {
    registerUser,
    loginUser
}