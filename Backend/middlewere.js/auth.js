
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please log in.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded JWT:", decoded);

    // Ensure this property matches your login token payload.
    const userId = decoded.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID missing from authentication token",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please log in again.",
      });
    }

    req.user = user;

    console.log("Authenticated user ID:", req.user._id);

    return next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};
