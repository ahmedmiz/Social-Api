import feedDataLayer from '../data/feedDataLayer';  

import { IPost } from "../DB/postSchema";
import { IComment } from '../DB/commentSchema';  
import { ValidationError  } from '../util/errorHandling';
import IFeedServices from '../interfaces/services/IFeedService';
class FeedService implements IFeedServices {
    async getAllPosts(pageNumber: number = 0, fields: string[]): Promise<IPost[]> {
        try {
            fields = ["content", "userId", "userName"];
            const posts: IPost[] | null = await feedDataLayer.getAllPosts(pageNumber, fields);
            return posts ? posts : [];
        } catch (error) {
            throw error;
        }
    }
    async getPostById(postId: string, fields: string[]): Promise<IPost | null> {
        try {
            const post: IPost | null = await feedDataLayer.getPostById(postId, fields);
            return post;
        } catch (error) {
            throw error;
        }
    }
    
    async createPost(content: string, userId: string, userName: string): Promise<IPost | null> {
        try {
            if (!content || content.trim().length == 0) throw new ValidationError("Content text must be provided!");
            const post: IPost | null = await feedDataLayer.createPost(content, userId, userName);
            if (!post)
                throw new ValidationError("Post creation failed or post ID is invalid.");

            return post;
        } catch (error) {
            throw error;
        }
    }
    async updatePostContent(content: string, postId: string): Promise<IPost | null> {
        try {
            if (!content || content.trim().length == 0) throw new ValidationError("Content text must provided!");
            const post: IPost | null = await feedDataLayer.updatePostContent(content, postId);
            if (!post)
                throw new ValidationError("Post updated failed or post ID is invalid.");
            return post;
        } catch (error) {
            throw error;
        }
    }
    async deletePost(postId: string): Promise<Boolean> {
        try {
            await feedDataLayer.deletePost(postId);
            return true;
        } catch (error) {
            throw error;
        }
    }
    async getCommentById(commentId: string, fields: string[]): Promise<IComment | null> {
        try {
            const comment: IComment | null = await feedDataLayer.getCommentById(commentId, fields);
            return comment;
        } catch (error) {
            throw error;
        }
    }
    async getPostComments(postId: string, fields: string[]): Promise<IComment[]> {
        try {
            const comments: IComment[] = await feedDataLayer.getPostComments(postId , fields);
            return comments ? comments : [];
        } catch (error) {
            throw error;
        }
    }
    async createComment(content: string, postId: string, userName: string, userId: string): Promise<IComment | null> {
        try {
            if (!content || content.trim().length == 0) throw new ValidationError("Content text must provided!");
            await feedDataLayer.getPostById(postId, ["userId"]);
            const comment: IComment | null = await feedDataLayer.createComment(content, userName, userId, postId);
            if (!comment)
                throw new ValidationError("Comment creation failed or comment ID is invalid.");
            return comment;
        } catch (error) {
            throw error;
        }
    }
    async updateCommentContent(content: string, commentId: string): Promise<IComment | null >{
        try {
            if (!content || content.trim().length == 0) throw new ValidationError("Content text must provided!");
            const updatedComment : IComment | null = await feedDataLayer.updateCommentContent(content, commentId);
            return updatedComment;
            
        } catch (error) { 
            throw error; 
        }
     }
    async deleteComment(commentId : string ): Promise<Boolean>{
        try {
            await feedDataLayer.deleteComment(commentId); 
            return true;
        } catch (error) { 
            throw error; 
        }
    }
}  

export default new FeedService();  