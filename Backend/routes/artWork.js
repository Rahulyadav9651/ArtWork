import express from "express";

const routerArt= express.Router();


import { createArtWork,getLatestArt, getArtworksByCategory, editArtWork, getMyArtworks,deleteArtwork } from "../controllers/artWork.js";
import { auth } from "../middlewere.js/auth.js";


routerArt.post('/create',auth,createArtWork)

// routerArt.post(
//   "/create",

//   upload.single("image"),
//   createArtWork
// );

routerArt.get('/latest',getLatestArt);
routerArt.get('/category',getArtworksByCategory);
routerArt.patch('/artwork/:artworkId',auth,editArtWork);
routerArt.get('/my-artworks',auth,getMyArtworks);
routerArt.delete('delete-art',auth,deleteArtwork);


export default routerArt;