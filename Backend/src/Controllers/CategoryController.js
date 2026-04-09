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

const getCategoryById=async(req,res)=>{
    try {

    const category = await CategorySchema.findById(req.params.id)

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      })
    }

    res.json({
      data: category
    })

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}


const updateCategory=async(req,res)=>{
      try {
    const { categoryName, description, isActive } = req.body;

    const category = await CategorySchema.findByIdAndUpdate(
      req.params.id,
      { categoryName, description, isActive },
      { new: true }
    );

    res.json({
      message: "Category updated",
      data: category
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

const deleteCategory=async(req,res)=>{
      try {
    const deleted = await CategorySchema.findByIdAndUpdate(
      req.params.id,
      { isActive: false },   // 🔥 soft delete
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    res.json({
      message: "Category deactivated",
      data: deleted
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports={
    addCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}