import { Router } from "express";
import postsRouter from "./posts";
import commentsRouter from "./comments";
const router = Router();


router.use('/posts',postsRouter)
router.use('/comments', commentsRouter);



export default router;