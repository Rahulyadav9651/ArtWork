
//import cloudinary from "cloudinary";

// const cloudinaryConnect = () => {
//   try {
//     cloudinary.v2.config({
//       cloud_name: process.env.CLOUD_NAME,
//       api_key: process.env.API_KEY,
//       api_secret: process.env.API_SECRET,
//     });

//     console.log("Cloudinary connected successfully");
//   } catch (error) {
//     console.log("Cloudinary connection failed:", error);
//   }
// };

// export default cloudinaryConnect;



import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export { cloudinary };

export default function cloudinaryConnect() {
  console.log("Cloudinary configured");
}
