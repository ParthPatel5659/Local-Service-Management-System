const CategorySchema=require("../Models/CatrogrieModel")


const addCategory=async(req,res)=>{
    try {
        const saveCategory=await CategorySchema.create(req.body)
        res.status(201).json({
            message:"Category add successfully",
            data:saveCategory
        })
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
           message:error.message
        })
    }
}

const getAllCategory=async(req,res)=>{
    try {
        const fetchCategory= await CategorySchema.find({ isActive: true })
         res.json({
            message:"Category Fetch Succesfully",
            data:fetchCategory
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message
        })
    }
}




module.exports={
    addCategory,
    getAllCategory
}