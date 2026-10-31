
import express from "express";
const routerComment= express.Router();
import { auth } from "../middlewere.js/auth.js";

import { addComment, getComment, updateComment, deleteComment} from "../controllers/comment.js";


routerComment.post('/add/:artwork',auth ,addComment);
routerComment.get('/comments/:artworkId',getComment);
routerComment.patch('/:commentId',auth,updateComment);
routerComment.delete('/delete/:commentId',auth,deleteComment);

export default routerComment;