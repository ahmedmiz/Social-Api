import { Router } from "express";
import PostsController from "../controllers/feedController";
import isAuth from '../middlewares/isAuth'; 
import Authorization from "../middlewares/authorization";
import { validate } from '../middlewares/validatior';
import { createCommentSchema , createPostSchema ,updateCommentSchema , updatePostSchema} from "../validators/validationSchemas";
const router = Router();


// get list of posts 
router.get("/", PostsController.getAllPosts);

// get a post by it's id 
router.get("/:postId", PostsController.getPostById);

// creats a post 
router.post("/", isAuth,validate(createPostSchema),PostsController.createPost);

//update a post content
router.patch("/:postId", isAuth,Authorization.post ,validate(createPostSchema) , PostsController.updatePost);

//delete a post 
router.delete("/:postId", isAuth , Authorization.post , PostsController.deletePost);

// get all comments on a post 
router.get("/:postId/comments", PostsController.getCommentsByPostId);
// create a comment on post 
router.post("/:postId/comments", isAuth,validate(createCommentSchema),  PostsController.createComment);
//update comment content 
router.patch("/comments/:commentId", isAuth, Authorization.comment,validate(updateCommentSchema) , PostsController.updateComment);
// delete a comment 
router.delete("/comments/:commentId", isAuth, Authorization.comment , PostsController.deleteComment);

export default router;