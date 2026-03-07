const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({

  title:{
    type:String,
    required:true
  },

  body:{
    type:String,
    required:true
  },

  category:{
    type:String,
    required:true
  },

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }

},{timestamps:true})


const notes = mongoose.model("notes",noteSchema)

module.exports = notes