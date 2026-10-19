import mongoose from "mongoose";

export const CATEGORIES = ["Sticker Illustrations", "Canvas Paintings", "Sketches"];

const artworkSchema= new mongoose.Schema({

title: { type: String,
     required: true, 
     trim: true, 
     maxlength: 100
     },

    description: { type: String,
         trim: true,
          maxlength: 1000, 
          default: ""
         },

    category: {
         type: String,
          enum: CATEGORIES, 
          required: true, 
          index: true 
        },
    imageUrl :{
       type: String,
        required: true 
    
    },
     
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tags: [{ type: String, trim: true, lowercase: true }],


    
})

export default mongoose.model("Artwork", artworkSchema);