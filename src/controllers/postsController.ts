import { Request, Response, NextFunction } from 'express';
import { apiErrorHandling , NotFoundError , ValidationError , unCaughtErrorHandler  } from '../util/errorHandling';
import postServices from '../services/postServices';

export default class PostsController { 
public static getAllPosts = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const pageNumber = req.body.pageNumber; 
        const posts = await postServices.getAllPosts(pageNumber); 
        res.status(200).json(posts);
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);
        
        else unCaughtErrorHandler(error, res);
    }
}
    public static getPostById = async (req: Request, res: Response) => { 
    try {
        const postId: string = req.params.postId; 
        const fields: string[] = ["content", "author", "authorName"];
        const post = await postServices.getPostById(postId ,fields); 
        res.status(200).json(post);
    } catch (error) { 
        if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
        else unCaughtErrorHandler(error, res);
    }
    }
    public static  getPostsByUserId = async (req: Request, res: Response) => { 
        try {
            const userId: string = req.params.userId; 
            const userPosts: any = await postServices.getUserPostsById(userId);
            res.status(200).json(userPosts); 
    
    } catch (error) { 
    if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
            else unCaughtErrorHandler(error, res);
        }
    }
    public static createPost = async (req: any, res: Response) => {
    try {
        const userId: string = req.userId;
        const userName : string = req.userName;
        const content: string = req.body.content;
        await postServices.createPost(content, userId, userName); 
        res.status(201).json({ message: "created a post successfully!"});
    } catch (error) { 
        if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
        else unCaughtErrorHandler(error, res);
    }
    }
    public static updatePost = async (req: any, res: any) => {
        try {
            const content: string = req.body.content;
            const postId: string = req.params.postId;
            const updatedPost = await postServices.updatePost(content, postId);
            if (!updatedPost) throw new NotFoundError("Unexpected error has occurred when creating the post!");
            res.status(200).json({ message: "updated a post successfully!" });

        } catch (error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
            else unCaughtErrorHandler(error, res);
        }

    }
    public static deletePost = async (req: any, res: Response) => {
    try {
        const postId: string = req.params.postId; 
        await postServices.deletePost(postId);  
        res.status(201).json({ message: "Deleted a post successfully!" });
    } catch (error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
            else unCaughtErrorHandler(error, res);
    }

    }
    public static getCommentsByPostId = async (req: Request, res: Response) => {
        try {

            const postId: string  = req.params.postId; 
            const comments: any = postServices.getCommentsByPostId(postId);
            res.status(200).json({ comments: comments });
        } catch (error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
            else unCaughtErrorHandler(error, res);
        }
    }
    public static createComment = async (req: any, res: Response) => { 
        try {
        const userId: string = req.userId;
        const userName : string = req.userName;
        const content: string = req.body.content;
        const postId: string = req.body.postId; 
        await postServices.createComment(content,postId, userId, userName); 
        res.status(201).json({ message: "created a post successfully!"});
    } catch (error) { 
        if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
        else unCaughtErrorHandler(error, res);
        }
        
    }
    public static updateComment = async (req: any, res: Response) => { 
        try {
            const commentId : string = req.params.commentId;
            const content: string = req.body.content;
            await postServices.updateComment(content, commentId);
            res.status(201).json({ message: "Updated comment successfully!" });
        } catch (error) {
        if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
        else
            unCaughtErrorHandler(error, res);
        }
        
    }
    public static deleteComment = async (req: any, res: Response) => { 
        try {
            const commentId: string = req.params.commentId;
            await postServices.deleteComment(commentId);
            res.status(201).json({ message: "removed comment successfully!" });
        } catch (error) { 
        if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
        else  apiErrorHandling(error , req , res , "Unexpected error has occurred when creating the post!" , 500);
    }
        
    }
    
}







