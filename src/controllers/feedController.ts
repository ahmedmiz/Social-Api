import { Request, Response, NextFunction } from 'express';
import { apiErrorHandling , NotFoundError , ValidationError , unCaughtErrorHandler  } from '../util/errorHandling';
import feedServices from '../services/feedService';
import { sendResponse } from '../util/responsHandler';
import Messages from '../util/message';
import { IPost } from '../DB/postSchema';
import { IComment } from '../DB/commentSchema';
export default class PostsController { 
    
public static getAllPosts = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const pageNumber: string = req.query.page as string || "1"; // Default to page 1 if not provided
        const page: number = Number(pageNumber);
        if (isNaN(page) || !Number.isFinite(page) || page < 1) {
            throw new ValidationError("Invalid page number");
        }let postFileds : string[] = ["content", "author", "authorName", "numberOfComments"];
        const posts = await feedServices.getAllPosts(page, postFileds); 
         return sendResponse(res, 200, Messages.SUCCESS.FETCHED("posts"),posts);
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof ValidationError)
                  apiErrorHandling(error, req, res, error.message, 400);
        
        else unCaughtErrorHandler(error, req ,res , next);
    
    }
}
    public static getPostById = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const postId: string = req.params.postId; 
        const fields: string[] = ["content", "author", "authorName", "numberOfComments"];
        const post = await feedServices.getPostById(postId, fields); 
        return sendResponse(res, 200, Messages.SUCCESS.FETCHED("post"),post);

    } catch (error) { 
        if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
       else unCaughtErrorHandler(error, req ,res , next);
    }
    }
    public static createPost = async (req: any, res: Response, next: NextFunction) => {
        try {
        const userId: string = req.userId;
        const userName : string = req.userName;
        const content: string = req.body.content;
        const post:IPost | null =  await feedServices.createPost(content, userId, userName); 
        return sendResponse(res, 201, Messages.SUCCESS.CREATED("post"),post);
    } catch (error) { 
        if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
       else unCaughtErrorHandler(error, req ,res , next);
    }
    }
    public static updatePost = async  (req: Request, res: Response, next: NextFunction) => {
        try {
            const content: string = req.body.content;
            const postId: string = req.params.postId;
            const updatedPost = await feedServices.updatePostContent(content, postId);
            if (!updatedPost) throw new NotFoundError("Unexpected error has occurred when creating the post!");
            return sendResponse(res, 200, Messages.SUCCESS.UPDATED("post"),updatedPost);

        } catch (error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
            else unCaughtErrorHandler(error, req ,res , next);        }

    }
    public static deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId: string = req.params.postId; 
        await feedServices.deletePost(postId);  
        return sendResponse(res, 201, Messages.SUCCESS.DELETED("post"));
    } catch (error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
           else unCaughtErrorHandler(error, req ,res , next);
    }

    }
    public static getCommentsByPostId = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const postId: string = req.params.postId; 
            let fields: string[] = ["content", "userId", "userName"];
            const comments: any = await feedServices.getPostComments(postId, fields);
            return sendResponse(res, 200, Messages.SUCCESS.FETCHED("comments"),comments);
        } catch (error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
            else unCaughtErrorHandler(error, req ,res , next);        }
    }
    public static createComment = async (req: any, res: Response, next: NextFunction) => { 
        try {
        const userId: string = req.userId;
        const userName : string = req.userName;
        const content: string = req.body.content;
        const postId: string = req.params.postId;  
        const comment: IComment |  null = await feedServices.createComment(content,postId, userId, userName); 
        return sendResponse(res, 201, Messages.SUCCESS.CREATED("comment"),comment);
    } catch (error) { 
        if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
       else unCaughtErrorHandler(error, req ,res , next);
        }
        
    }
    public static updateComment = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            const commentId : string = req.params.commentId;
            const content: string = req.body.content;
            const updatedComment : IComment | null = await feedServices.updateCommentContent(content, commentId);
            return sendResponse(res, 200, Messages.SUCCESS.UPDATED("comment"),updatedComment);
        } catch (error) {
        if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
       else unCaughtErrorHandler(error, req ,res , next);
        }
        
    }
    public static deleteComment = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            const commentId: string = req.params.commentId;

            await feedServices.deleteComment(commentId);
            return sendResponse(res, 200, Messages.SUCCESS.DELETED("comment"));
        } catch (error) { 
        if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
        else unCaughtErrorHandler(error, req ,res , next);
    }
        
    }
    
}







