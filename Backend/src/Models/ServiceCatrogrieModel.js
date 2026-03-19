const mongoose= require("mongoose")

const Schema= mongoose.Schema;

const CategorieSchema= new Schema({
   categoryName: {
    type: String,
    required: true
  },
  description: {
    type: String
  }

},{timestamps:true})

module.export=mongoose.model("Category",CategorieSchema);