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

module.exports={
    addReview,
}