// const ServiceSchema= require("../Models/ServiceModel");
// //Add Service
// const addService= async(req,res)=>{
//     const saveService=await ServiceSchema.create (req.body);
//     try {
//         res.status(201).json({
//             message:"Service add Sucessfully",
//             data:saveService
//         })
//     } catch (error) {
//         console.log(error);
        
//         res.status(500).json({
//             message:error.message
//         })
//     }
// }

// //Get All Service
// const getAllService=async(req,res)=>{
//     try {
//         const findService = await ServiceSchema.find().populate([
//             {path: "providerId"},
//             {path: "categoryId"}
//         ])
//       res.json({
//         message : "All Service Get Success Fully",
//         data : findService
//       })
//     } catch (error) {
//        res.status(500) .json({
//         message:error.message
//        })
//     }
// }

// //Get Service By Id

// const getserviceById= async(req,res)=>{

//     try{
//         if(!req.params.id){
//             res.status(400).json({
//                 message:"Id Is Requird"
//             })
//         }
//         const findServiceById= await ServiceSchema.find({ providerId: req.params.providerId }).populate("providerId")

//         if(!findServiceById){
//             res.status(404).json({
//                 message:"service not found"
//             })
//         }
//         res.status(200).json({
//             message:"Service get successfully",
//             data:findServiceById
//         })
//     }catch(err){
//         res.json({
//             message:err.message
//         })
//     }
// }

// //Update Service

// const updateServiceById= async(req,res)=>{
//     try {
//         const updateService= await ServiceSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})
//         res.json({
//             message:"Service update Successfully",
//             data:updateService
//         })
//     } catch (error) {
//         res.status(500).json({
//             message:error.message
//         })
//     }
// }

// //Delete Service
// const deleteServiceById= async(req,res)=>{
//     try {
//         const deleteService= await ServiceSchema.findByIdAndDelete(req.params.id)
//         res.json({
//             message:"Service delete Successfully",
//             data:deleteService
//         })
//     } catch (error) {
//         res.status(500).json({
//             message:error.message
//         })
//     }
// }
// module.exports={
//     addService,
//     getAllService,
//     getserviceById,
//     updateServiceById,
//     deleteServiceById
// }

const ServiceSchema = require("../Models/ServiceModel");
const logActivity = require("../utils/activityLogger");
const Activity = require("../Models/ActivityLogModel");
// ✅ Add Service
// const addService = async (req, res) => {
//     try {
//         const saveService = await ServiceSchema.create(req.body);

//         res.status(201).json({
//             message: "Service added successfully",
//             data: saveService
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };

const addService = async (req, res) => {
    try {
        // console.log("USER:", req.user); // debug

        // if (!req.user) {
        //     return res.status(401).json({
        //         message: "Unauthorized"
        //     });
        // }

        // const providerId = req.user.id; // ✅ from token

        const saveService = await ServiceSchema.create(req.body);
           await Activity.create({
            providerId: req.params.id,
            role: "provider",
            action: "SERVICE_ADDED",
            message: "Provider added new service"
            });

             res.status(201).json({
            message: "Service added successfully",
            data: saveService
        });

    } catch (error) {
        console.log("ERROR:", error); // 🔥 must log

        res.status(500).json({
            message: error.message
        });
    }
};

// ✅ Get All Services
const getAllService = async (req, res) => {
    try {
        const findService = await ServiceSchema.find()
            .populate("providerId")
            .populate("categoryId");

        res.json({
            message: "All services fetched successfully",
            data: findService
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ✅ Get Services of Logged-in Provider (🔥 MAIN FIX)
const getMyServices = async (req, res) => {
    try {
        const providerId = req.params.id; // from token

        const services = await ServiceSchema.find({ providerId })
            .populate("providerId")
            .populate("categoryId");

        if (!services || services.length === 0) {
            return res.status(404).json({
                message: "No services found for this provider"
            });
        }

        res.status(200).json({
            message: "Provider services fetched successfully",
            data: services
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        });
    }
};

// ✅ Update Service
const updateServiceById = async (req, res) => {
    try {
        const updateService = await ServiceSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

         await Activity.create({
           providerId: req.params.id,
            role: "provider",
            action: "SERVICE_EDITED",
            message: "Provider edit service"
            });

        res.json({
            message: "Service updated successfully",
            data: updateService
        });

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: error.message
        });
    }
};

// ✅ Delete Service
const deleteServiceById = async (req, res) => {
    try {
        const deleteService = await ServiceSchema.findByIdAndDelete(req.params.id);
         await Activity.create({
            providerId: req.params.id,
            role: "provider",
            action: "SERVICE_DELETED",
            message: "Provider delete service"
            });

        res.json({
            message: "Service deleted successfully",
            data: deleteService
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET /services/provider/:id

const getProviderService = async (req, res) => {
    try {
        const services = await ServiceSchema.find({
            providerId: req.params.id,
        });

        res.status(200).json({
            message: "Provider service fetched successfully",
            data: services,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

//get service by id

const getServicebyId=async(req,res)=>{
    try {
        const service=await ServiceSchema.findById(req.params.id)
        .populate("providerId", "Firstname Lastname email phone")
        .populate("categoryId", "categoryName");

        if (!service) {
      return res.status(404).json({
        message: "Service not found"
      });
    }

    res.status(200).json({
      message: "Service fetched",
      data: service
    });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

//update avaliable status

const updateAvaliblestaues=async(req,res)=>{
    try {
        const service= await ServiceSchema.findById(req.params.id)
        if(!service){
            return res.status(404).json({ message: "Service not found" });
        }

        service.availability = !service.availability;
    await service.save();

    res.status(200).json({
      message: "Availability updated",
      data: service,
    });
    } catch (error) {
          res.status(500).json({
            message: error.message
        });
    }
}

const getServiceByCategory = async (req, res) => {
  try {
    const services = await ServiceSchema.find({
      categoryId: req.params.id,
    }).populate("providerId");

    res.json({
      data: services,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    addService,
    getAllService,
    getMyServices,
    updateServiceById,
    deleteServiceById,
    getProviderService,
    getServicebyId,
    updateAvaliblestaues,
    getServiceByCategory
};