//import artWork from "../models/artWork.js";
//import artWork from "../models/artWork.js";
import Artwork , { CATEGORIES } from "../models/artWork.js";
import { uploadImageToCloudinary } from "../utils/mailTemplate/imageUploader.js";
import mongoose from "mongoose";


const parseTags = (tags) => {
  if (!tags) return [];
  const list = Array.isArray(tags) ? tags : String(tags).split(",");
  return [...new Set(list.map((t) => t.trim().toLowerCase()).filter(Boolean))].slice(0, 10);
};

export const createArtWork = async (req, res) => {
  let uploadedImage = null;

  try {
    const { title, description, category, tags } = req.body;
    const image = req.files?.image; // frontend field name must be "image"

    // Required fields (description and tags are optional)
    if (!title?.trim() || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required",
      });
    }

    if (!CATEGORIES.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Category must be one of: ${CATEGORIES.join(", ")}`,
      });
    }

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Upload image (the uploader throws if it's not an image or is over 5 MB)
    try {
      uploadedImage = await uploadImageToCloudinary(
        image,
        process.env.FOLDER_NAME || "artify/artworks",
        1200,
        "auto"
      );
    } catch (uploadError) {
      return res.status(400).json({
        success: false,
        message: uploadError.message,
      });
    }

    // Create entry in DB
    const newArt = await Artwork.create({
      title,
      description,
      category,
      tags: parseTags(tags),
      imageUrl: uploadedImage.secure_url,
       imagePublicId: uploadedImage.public_id,
      artist: req.user._id,
    });

    await newArt.populate("artist", "firstName lastName image");

    return res.status(201).json({
      success: true,
      message: "Artwork uploaded successfully",
      artwork: newArt,
    });
  } catch (error) {
    

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((e) => e.message).join(", ");
      return res.status(400).json({ success: false, message });
    }

    console.error("createArtWork error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create artwork",
    });
  }
};



export const getLatestArt = async (req, res)=>{

    try{

        const artwork= await Artwork.find().select("title description imageUrl artist tags likes").populate("artist","firstName lastName").sort({createdAt:-1}).lean();

        return res.status(200).json({
            success:true,
            message:"New data fetch succss",
            artwork,
        })

    }

    catch(error){
 console.error("getArtworks error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch artworks" });

    }


}


export const getArtworksByCategory = async(req, res)=>{

    try{

        const {category}= req.body;
// Match the category case-insensitively against the allowed list
    const validCategory = CATEGORIES.find(
      (c) => c.toLowerCase() === category.trim().toLowerCase()
    );

    if (!validCategory) {
      return res.status(400).json({
        success: false,
        message: `Category must be one of: ${CATEGORIES.join(", ")}`,
      });
    }

    const categoryArtWork= await Artwork.find({category:validCategory}).select("title description imageUrl artist tags likes").populate("artist","firstname lastName").sort({createdAt:-1}).lean();

return res.status(200).json({
    success:true,
    message:"CategoryArtWork fetch success",
    data:categoryArtWork,

})


    }
    catch(error){
 console.error("getArtworksByCategory error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch artworks by category",
    });

    }

}



// export const editArtWork = async (req, res) => {
//   try {
//     const { userId, artworkId } = req.params;
//     const { title, description, category, tags } = req.body;
//     const image = req.files?.image;

//     // 1. Verify the logged-in user
//     if (userId !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "You can only update your own artworks",
//       });
//     }

//     // 2. Find artwork belonging to this user
//     const artwork = await Artwork.findOne({
//       _id: artworkId,
//       artist: userId,
//     });

//     if (!artwork) {
//       return res.status(404).json({
//         success: false,
//         message: "Artwork not found for this user",
//       });
//     }

//     // 3. Validate and update title
//     if (title !== undefined) {
//       if (typeof title !== "string" || !title.trim()) {
//         return res.status(400).json({
//           success: false,
//           message: "Title cannot be empty",
//         });
//       }

//       artwork.title = title.trim();
//     }

//     // 4. Update description
//     if (description !== undefined) {
//       if (typeof description !== "string") {
//         return res.status(400).json({
//           success: false,
//           message: "Description must be a string",
//         });
//       }

//       artwork.description = description.trim();
//     }

//     // 5. Validate and update category
//     if (category !== undefined) {
//       const validCategory =
//         typeof category === "string"
//           ? CATEGORIES.find(
//               (c) => c.toLowerCase() === category.trim().toLowerCase()
//             )
//           : undefined;

//       if (!validCategory) {
//         return res.status(400).json({
//           success: false,
//           message: `Category must be one of: ${CATEGORIES.join(", ")}`,
//         });
//       }

//       artwork.category = validCategory;
//     }

//     // 6. Update tags
//     if (tags !== undefined) {
//       artwork.tags = parseTags(tags);
//     }

//     // 7. Upload replacement image if provided
//     if (image) {
//       const uploadedImage = await uploadImageToCloudinary(
//         image,
//         process.env.FOLDER_NAME || "artify/artworks",
//         1200,
//         "auto"
//       );

//       if (!uploadedImage?.secure_url) {
//         return res.status(500).json({
//           success: false,
//           message: "Image upload failed",
//         });
//       }

//       artwork.imageUrl = uploadedImage.secure_url;
//     }

//     // 8. Save changes
//     await artwork.save();

//     // 9. Populate artist information
//     await artwork.populate(
//       "artist",
//       "firstName lastName image"
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Artwork updated successfully",
//       artwork,
//     });
//   } catch (error) {
//     console.error("editArtWork error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to update artwork",
//     });
//   }
// };




export const editArtWork = async (req, res) => {
  let uploadedImagePublicId = null;

  try {
    const { artworkId } = req.params;
    const { title, description, category, tags } = req.body;
    const image = req.files?.image;
    const userId = req.user._id;

//console.log("jbd",userId)
    // 1. Verify authenticated user
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }


    // 2. Validate artwork ID
    if (!mongoose.Types.ObjectId.isValid(artworkId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid artwork ID",
      });
    }

    // 3. Find artwork owned by authenticated user
    const artwork = await Artwork.findOne({
      _id: artworkId,
      artist: userId,
    });

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found for this user",
      });
    }

    // 4. Validate and update title
    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title cannot be empty",
        });
      }

      if (title.trim().length > 100) {
        return res.status(400).json({
          success: false,
          message: "Title cannot exceed 100 characters",
        });
      }

      artwork.title = title.trim();
    }

    // 5. Validate and update description
    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({
          success: false,
          message: "Description must be a string",
        });
      }

      if (description.trim().length > 1000) {
        return res.status(400).json({
          success: false,
          message: "Description cannot exceed 1000 characters",
        });
      }

      artwork.description = description.trim();
    }

    // 6. Validate and update category
    if (category !== undefined) {
      const validCategory =
        typeof category === "string"
          ? CATEGORIES.find(
              (c) => c.toLowerCase() === category.trim().toLowerCase()
            )
          : undefined;

      if (!validCategory) {
        return res.status(400).json({
          success: false,
          message: `Category must be one of: ${CATEGORIES.join(", ")}`,
        });
      }

      artwork.category = validCategory;
    }

    // 7. Update tags
    if (tags !== undefined) {
      try {
        artwork.tags = parseTags(tags);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid tags format",
        });
      }
    }

    // 8. Upload replacement image if provided
    const oldImagePublicId = artwork.imagePublicId;

    if (image) {
      const uploadedImage = await uploadImageToCloudinary(
        image,
        process.env.FOLDER_NAME || "artify/artworks",
        1200,
        "auto"
      );

      if (!uploadedImage?.secure_url || !uploadedImage?.public_id) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }

      uploadedImagePublicId = uploadedImage.public_id;

      artwork.imageUrl = uploadedImage.secure_url;
      artwork.imagePublicId = uploadedImage.public_id;
    }

    // 9. Save updated artwork
    await artwork.save();

    // The new image is now saved successfully.
    uploadedImagePublicId = null;

    // 10. Delete old Cloudinary image after successful save
    if (image && oldImagePublicId) {
      try {
        await cloudinary.uploader.destroy(oldImagePublicId);
      } catch (cleanupError) {
        console.error(
          "Old Cloudinary image cleanup failed:",
          cleanupError.message
        );
      }
    }

    // 11. Populate artist information
    await artwork.populate("artist", "firstName lastName image");

    return res.status(200).json({
      success: true,
      message: "Artwork updated successfully",
      artwork,
    });
  } catch (error) {
    console.error("editArtWork error:", error);

    // Remove a newly uploaded image if the database save failed.
    if (uploadedImagePublicId) {
      try {
        await cloudinary.uploader.destroy(uploadedImagePublicId);
      } catch (cleanupError) {
        console.error(
          "New Cloudinary image cleanup failed:",
          cleanupError.message
        );
      }
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update artwork",
    });
  }
};




export const getMyArtworks = async(req, res)=>{

try{

const id= req.user._id;


const myWork= await Artwork.find({artist:id}).select("title description category imageUrl artist tags likes").populate("artist","firstName lastName").sort({createdAt:-1}).lean();

return res.status(200).json({
  success:true,
  message:"Data fetch succssfully",
  data:myWork,
})



}

catch(error){
console.error("getMyArtworks error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch your artworks",
    });

}


}


export const deleteArtwork = async(req, res)=>{

try{
  const userId= req.user._id;

  const deleteUser= await Artwork.findByIdAndDelete({artist:userId})

  if(!deleteUser){
return res.status(404).json({
        success: false,
        message: "Artwork not found or you don't have permission to delete it",
      });

  }

//// Remove the artwork's comments
  await Comment.deleteMany({ artwork: userId });

if (Artwork.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(Artwork.imagePublicId);
      } catch (cloudError) {
        console.error("Cloudinary delete failed for", Artwork.imagePublicId, cloudError.message);
      }
    }


    return res.status(200).json({
      success: true,
      message: "Artwork deleted successfully",
      deletedId: userId,
    });



}
catch(error){
 console.error("deleteArtwork error:", error);
    return res.status(500).json(
      { 
        success: false,
       message: "Failed to delete artwork" 
      });

}


}


