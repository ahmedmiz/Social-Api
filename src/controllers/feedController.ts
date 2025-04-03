import { Request, Response, NextFunction } from 'express';
import { apiErrorHandling , NotFoundError , ValidationError , unCaughtErrorHandler  } from '../util/errorHandling';
import feedServices from '../services/feedService';
import { sendResponse } from '../util/responsHandler';
import Messages from '../util/message';
import { IComment, IPost } from '../dp/schemas';
export default class PostsController { 
    
public static getAllPosts = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const pageNumber = req.body.pageNumber; 
        let postFileds : string[] = ["content", "author", "authorName", "numberOfComments"];
        const posts = await feedServices.getAllPosts(pageNumber, postFileds); 
         return sendResponse(res, 200, Messages.SUCCESS.FETCHED("posts"),posts);
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);
        
        else unCaughtErrorHandler(error, res);
    }
}
    public static getPostById = async (req: Request, res: Response) => { 
    try {
        const postId: string = req.params.postId; 
        const fields: string[] = ["content", "author", "authorName", "numberOfComments"];
        const post = await feedServices.getPostById(postId, fields); 
        return sendResponse(res, 200, Messages.SUCCESS.FETCHED("post"),post);

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
        const post:IPost | null =  await feedServices.createPost(content, userId, userName); 
        return sendResponse(res, 201, Messages.SUCCESS.CREATED("post"),post);
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
            const updatedPost = await feedServices.updatePostContent(content, postId);
            if (!updatedPost) throw new NotFoundError("Unexpected error has occurred when creating the post!");
            return sendResponse(res, 200, Messages.SUCCESS.UPDATED("post"),updatedPost);

        } catch (error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
            else unCaughtErrorHandler(error, res);
        }

    }
    public static deletePost = async (req: any, res: Response) => {
    try {
        const postId: string = req.params.postId; 
        await feedServices.deletePost(postId);  
        return sendResponse(res, 201, Messages.SUCCESS.DELETED("post"));
    } catch (error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
            else unCaughtErrorHandler(error, res);
    }

    }
    public static getCommentsByPostId = async (req: Request, res: Response) => {
        try {

            const postId: string = req.params.postId; 
            let fields: string[] = ["content", "userId", "userName"];
            const comments: any = feedServices.getPostComments(postId , fields);
            return sendResponse(res, 200, Messages.SUCCESS.FETCHED("comments"),comments);
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
        const comment: IComment |  null = await feedServices.createComment(content,postId, userId, userName); 
        return sendResponse(res, 201, Messages.SUCCESS.CREATED("comment"),comment);
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
            const updatedComment : IComment | null = await feedServices.updateCommentContent(content, commentId);
            return sendResponse(res, 200, Messages.SUCCESS.UPDATED("comment"),updatedComment);
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
            await feedServices.deleteComment(commentId);
            return sendResponse(res, 200, Messages.SUCCESS.DELETED("comment"));
        } catch (error) { 
        if (error instanceof NotFoundError || error instanceof ValidationError)
            apiErrorHandling(error, req, res, error.message, 400);  
        else  apiErrorHandling(error , req , res , "Unexpected error has occurred when creating the post!" , 500);
    }
        
    }
    
}







