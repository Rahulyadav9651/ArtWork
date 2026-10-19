import mongoose, { Types } from "mongoose";


const userschema= new mongoose.Schema({

    firstName:{
    type:String,
    required:true,
    trim:true,
    },
 lastName:{
    type:String,
    required:true,
    trim:true,
    },
 email:{
    type:String,
    required:true,
    trim:true,
    },
 password:{
    type:String,
    required:true,
    trim:true,
    },

    token:{
type:String,
},

image:{
    type:String,
    require:true
 },
resetPasswordExpires:{
type: Date,
},


})

export default mongoose.model("User",userschema );