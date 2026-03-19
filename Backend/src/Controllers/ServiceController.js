const ServiceSchema= require("../Models/ServiceModel");
//Add Service
const addService= async(req,res)=>{
    const SaveService=await ServiceSchema.create (req.body);
    try {
        res.status(201).json({
            message:"Service add Sucessfully",
            data:SaveService
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message:error.message
        })
    }
}

const getAllService=async(req,res)=>{
    try {
        const findService = await Service.find()
      res.json({
        message : "All Service Get Success Fully",
        data : findService
      })
    } catch (error) {
       res.status(500) .json({
        message:error.message
       })
    }
}
module.exports={
    addService,
    getAllService
}