const reviewSchema= require("../Models/ReviweModel")

const addReview= async(req,res)=>{
    try {
        const SaveReview= await reviewSchema.create(req.body)
        res.status(201).json({
            message:"review add sucessfully",
            data:SaveReview
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

//Get All Review

const getAllreview=async(req,res)=>{
    try {
        const getreview=await reviewSchema.find()
        res.json({
            message:"get review succesfully",
            data:getreview
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}



module.exports={
    addReview,
    getAllreview
}