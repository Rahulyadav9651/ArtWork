import mongoose from "mongoose";
import Artwork from "../models/artWork.js";

/**
 * @desc    Like / unlike an artwork (toggle)
 * @route   PUT /api/artworks/:id/like
 * @access  Private
 */
export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid artwork id" });
    }

    const artwork = await Artwork.findById(id).select("likes");
    if (!artwork) {
      return res.status(404).json({ success: false, message: "Artwork not found" });
    }

    const alreadyLiked = artwork.likes.some(
      (likedUserId) => likedUserId.toString() === userId.toString()
    );

    // $pull removes the user; $addToSet adds the user only if not already present
    const update = alreadyLiked
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId } };

    const updated = await Artwork.findByIdAndUpdate(id, update, { new: true }).select("likes");

    return res.status(200).json({
      success: true,
      message: alreadyLiked ? "Artwork unliked" : "Artwork liked",
      liked: !alreadyLiked,
      likesCount: updated.likes.length,
    });
  } catch (error) {
    console.error("toggleLike error:", error);
    return res.status(500).json({ success: false, message: "Failed to update like" });
  }
};

/**
 * @desc    Get like count of an artwork (and whether the current user liked it)
 * @route   GET /api/artworks/:id/likes
 * @access  Public (isLiked is included only if req.user is set)
 */
export const getLikeCount = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid artwork id" });
    }

    const artwork = await Artwork.findById(id).select("likes").lean();
    if (!artwork) {
      return res.status(404).json({ success: false, message: "Artwork not found" });
    }

    const isLiked = req.user
      ? artwork.likes.some((uid) => uid.toString() === req.user._id.toString())
      : false;

    return res.status(200).json({
      success: true,
      likesCount: artwork.likes.length,
      isLiked,
    });
  } catch (error) {
    console.error("getLikeCount error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch likes" });
  }
};