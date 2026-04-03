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

//get review by service
const getServiceReviews = async (req, res) => {
  try {
    const serviceId = req.params.id;

    const reviews = await reviewSchema.find({ serviceId })
      .populate("userId", "Firstname Lastname");

    res.status(200).json({
      message: "Service reviews fetched",
      data: reviews,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

//get provider review
const getProviderReviews = async (req, res) => {
  try {
    const providerId = req.params.id;

    const reviews = await reviewSchema.find({ providerId })
      .populate("userId", "Firstname Lastname")
      .populate("serviceId", "serviceName");

    res.status(200).json({
      message: "Provider reviews fetched",
      data: reviews,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

module.exports={
    addReview,
    getAllreview,
    getServiceReviews,
    getProviderReviews
}