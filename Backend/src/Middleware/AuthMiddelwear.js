const jwt=require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;


const validateToken=(req,res,next)=>{
    try {

        const token= req.headers.authorization
        console.log(token);

        if(token){
             
            if(token.startswith("Bearer ")){
                const tokenvalue= token.split(" ")[1]
                const decodeData= jwt.verify(tokenvalue,jwtSecret)
                console.log(decodeData);
                next();
            }else{
                res.status(401).json({
                    message:"bearer is missing in token ...."
                })
            }

        }else{
            res.status(401).json({
                message:"token is missing...."
            })
        }
        
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:"error while validating token",
            err:err
        })
    }

}

module.exports=validateToken