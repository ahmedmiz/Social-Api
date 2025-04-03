import { Router } from "express";
import PostsController from "../controllers/feedController";
import isAuth from '../middlewares/isAuth'; 
import Authorization from "../middlewares/authorization";
const router = Router();

router.get("/:pageNumber", PostsController.getAllPosts);
router.get("/:postId", PostsController.getPostById);


router.post("/create", isAuth, PostsController.createPost);

router.put("/update/:postId", isAuth,Authorization.post , PostsController.updatePost);

router.delete("/delete/:postId", isAuth , Authorization.post , PostsController.deletePost);

router.get("/:postId/comments", PostsController.getCommentsByPostId);
router.post("/:postId/comments/create", isAuth, PostsController.createComment);
router.put("/:postId/comments/update/:commentId", isAuth , Authorization.comment , PostsController.updateComment);
router.delete("/:postId/comments/delete/:commentId", isAuth, Authorization.comment , PostsController.deleteComment);

export default router;