import { Router } from "express";
import PostsController from "../../controllers/feedController";
import isAuth from '../../middlewares/isAuth'; 
import Authorization from "../../middlewares/authorization";
import { validate } from '../../middlewares/validatior';
import {  createPostSchema  , updatePostSchema} from "../../validators/validationSchemas";
const router = Router();


router.get("/", PostsController.getAllPosts);
router.get("/:postId", PostsController.getPostById);
router.get("/:postId/comments", PostsController.getCommentsByPostId);
router.post("/", isAuth,validate(createPostSchema),PostsController.createPost);
router.patch("/:postId", isAuth,Authorization.post ,validate(createPostSchema) , PostsController.updatePost);
router.delete("/:postId", isAuth , Authorization.post , PostsController.deletePost);



export default router;