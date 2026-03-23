const ServiceSchema= require("../Models/ServiceModel");
//Add Service
const addService= async(req,res)=>{
    const saveService=await ServiceSchema.create (req.body);
    try {
        res.status(201).json({
            message:"Service add Sucessfully",
            data:saveService
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message:error.message
        })
    }
}

//Get All Service
const getAllService=async(req,res)=>{
    try {
        const findService = await ServiceSchema.find()
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

//Get Service By Id

const getserviceById= async(req,res)=>{
    try{
        const findServiceById= await ServiceSchema.findById(req.params.id)
        res.json({
            message:"Service get successfully",
            data:findServiceById
        })
    }catch(err){
        res.json({
            message:err.message
        })
    }
}

//Update Service

const updateServiceById= async(req,res)=>{
    try {
        const updateService= await ServiceSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json({
            message:"Service update Successfully",
            data:updateService
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

//Delete Service

const deleteServiceById= async(req,res)=>{
    try {
        const deleteService= await ServiceSchema.findByIdAndDelete(req.params.id)
        res.json({
            message:"Service delete Successfully",
            data:deleteService
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports={
    addService,
    getAllService,
    getserviceById,
    updateServiceById,
    deleteServiceById
}