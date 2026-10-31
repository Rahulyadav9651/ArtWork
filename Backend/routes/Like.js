import express from "express";

const likeRouter= express();

import { toggleLike,getLikeCount } from "../controllers/like.js";


likeRouter.post('/:id/like',toggleLike);
likeRouter.get('/:id/likes',getLikeCount);

export default likeRouter;