
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";

import database from "./config/database.js";
import router from "./routes/User.js";
import routerComment from "./routes/Comment.js";
import routerArt from "./routes/artWork.js";
import likeRouter from "./routes/Like.js";
import cloudinaryConnect from "./config/cloudinary.js";

const port = process.env.PORT || 3000;
const app = express();

// Middleware must come before routes
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp",
    createParentPath: true,
  })
);

// Routes
app.use("/api/v1", router);
app.use("/api/v1", routerArt);
app.use("/api/v1", routerComment);
app.use("/api/v1", likeRouter);

app.get("/", (req, res) => {
  res.status(200).send("Server is live");
});

// Database and Cloudinary
database.DbConnect();
cloudinaryConnect();

// Start server
app.listen(port, () => {
  console.log(`App is listening at PORT ${port}`);
});
