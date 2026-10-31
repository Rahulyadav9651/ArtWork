import Comment from "../models/comment.js"

import Artwork from "../models/artWork.js"


const formatComment = (c) => ({
  _id: c._id,
  text: c.text,
  userId: c.user?._id,
  userName: c.user ? `${c.user.firstName} ${c.user.lastName}` : "Deleted user",
  userImage: c.user?.image || "",
  createdAt: c.createdAt,
  updatedAt: c.updatedAt,
});


export const addComment= async(req, res)=>{

try{

    const {artworkId}= req.params;
    console.log("md",artworkId)
const {text}= req.body;
const userId= req.user._id;

if(!text){

    return res.status(400).json({
        success:false,
        message:"Text can not be empty"
    })
}

if(text.length>500){

    return res.status(400).json({
        success:false,
        message:"text can not be more then 500 char."
    })
}

const artworkExist= await Artwork.findById({_id:artworkId});

if(!artworkExist){

    return res.status(400).json({
        success:false,
        message:"ArtWork not found"
    })
}

const createComment= await Comment.create({
    artwork:artworkId,
    user:userId,
    text,
}
)
await Comment.populate("user","firstName lastName")

return res.status(201).json({
      success: true,
      message: "Comment added",
      comment: formatComment(Comment),
    });


}
catch(error){
console.error("addComment error:", error);
    return res.status(500).json({ success: false, message: "Failed to add comment" });

}

}






export const getComment = async (req, res) => {
  try {
    const { artworkId } = req.params;

    // Pagination
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit) || 10, 1),
      50
    );

    // Fetch comments and total count in parallel
    const [comments, total] = await Promise.all([
      Comment.find({ artwork: artworkId })
        .populate("user", "firstName lastName image")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      Comment.countDocuments({ artwork: artworkId }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: comments.map(formatComment),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("getComment error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
    });
  }
};



// export const updateComment= async(req , res)=>{

// try{

//     const {commentId} = req.params;
//     const {text}= req.body;
//     const userId= req.user._id;

//     if(!text){

//         res.status(400).json({
//             success:false,
//             message:"Comment text is required"
//         })
//     }

//     const editComment= await Comment.findById({_id:commentId, user:userId })
//     if (!editComment) {
//       return res.status(404).json({
//         success: false,
//         message: "Comment not found or you don't have permission to edit it",
//       });
//     }

//     Comment.text=text;
//     Comment.save();
//  await Comment.populate("user", "firstName lastName image");


//  return res.status(200).json({
//       success: true,
//       message: "Comment updated",
//       comment: formatComment(Comment),
//     });


// }

// catch(error){
// console.error("updateComment error:", error);
//     return res.status(500).json({ success: false, message: "Failed to update comment" });

// }


// }


export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Please log in first",
      });
    }

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    // Find the comment belonging to the logged-in user
    const editComment = await Comment.findOne({
      _id: commentId,
      user: req.user._id,
    });

    if (!editComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found or you don't have permission to edit it",
      });
    }

    // Update the document, not the Comment model
    editComment.text = text.trim();

    await editComment.save();

    await editComment.populate("user", "firstName lastName image");

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment: formatComment(editComment),
    });
  } catch (error) {
    console.error("updateComment error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update comment",
    });
  }
};




export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    

    // 2. Find the comment
    const comm = await Comment.findById(commentId);

    if (!comm) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // 3. Check whether the logged-in user is the comment author
    const isAuthor = comm.user.toString() === userId.toString();

    // 4. Check whether the logged-in user owns the artwork
    let isArtworkOwner = false;

    if (!isAuthor) {
      const artwork = await Artwork.findById(comm.artwork)
        .select("artist")
        .lean();

      isArtworkOwner =
        artwork?.artist?.toString() === userId.toString();
    }

    // 5. Check permissions
    if (!isAuthor && !isArtworkOwner) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this comment",
      });
    }

    // 6. Delete the comment
    await comm.deleteOne();

    // 7. Send response
    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      deletedId: commentId,
    });
  } catch (error) {
    console.error("deleteComment error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete comment",
    });
  }
};

