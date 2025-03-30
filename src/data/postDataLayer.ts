import { Post  , Comment, User} from "../model/models";
import { IComment, IPost } from "../dp/schemas";
import { NotFoundError } from "../util/errorHandling";
import userDataLayer from "./userDataLayer";
import mongoose from "mongoose";

class PostDataLayer {
    async getAllPosts(page: number , fields: string[]):  Promise<any>{ 
        try {
            const fieldSelector = fields.join(' ');
            const posts: IPost[] | null = await Post.find().sort({ createdAt: -1 }).skip((page - 1) * 10).limit(10).select(fieldSelector); 
            if (!posts) throw new NotFoundError("No posts to show!");
            return posts;
        } catch (error) { 
            throw error;
        }
    }
    async getPostById(postId: string, fields: string[]): Promise<IPost | null> {
        try {
            const fieldSelector = fields.join(' ');
            const post: IPost | null = await Post.findById(postId).select(fieldSelector).lean().exec();
            if (!post) throw new NotFoundError("Post not Found!");
            return post;
        } catch (error) {
            throw error;
        }
    } 
    async createPost(content: string, userId: string, userName: string) : Promise<IPost | null > {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const user = await userDataLayer.getUserById(userId ,[]);
            if (!user) throw new NotFoundError("User not found!");
            const createdPosts = await Post.create(
                [{ content, author: userId, authorName: userName }],
                { session }
            );
            const post: IPost | null = createdPosts[0];
            if (!post) throw new NotFoundError("Error on creating a post!");

            const updatedUser = await User.findByIdAndUpdate( userId,
            { $push: { posts: post._id } },
            { new: true, session }
        ).exec();
            if (!updatedUser) { throw new Error("Error on updating users posts!"); }
            await session.commitTransaction();
            session.endSession();
            return post;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        } 
    }
    async updatePostContent(content: string, postId: string) : Promise<IPost | null > {
        try { 
            const post: IPost | null = await Post.findByIdAndUpdate(postId, { content: content }, {new : true}).exec();
            if (!post) throw new NotFoundError("Error on creating a post!");
            return post;
        } catch (error) {
            throw error;
        } 
    }
    async deletePost(postId: string) : Promise<boolean | null > {
        try { 
            const post: IPost | null = await Post.findOneAndDelete({ _id: postId });
            if (!post) throw new NotFoundError("Error on deleting a post!");
            return true; 
        } catch (error) {
            throw error;
        } 
    }
     async getCommentById(commentId: string, fields: string[]): Promise<IComment | null> {
         try {
            if(mongoose.isValidObjectId(commentId) === false) throw new NotFoundError("commentId is not valid!");
            const fieldSelector = fields.join(' ');
            const comment: IComment | null = await Comment.findById(commentId).select(fieldSelector).exec();
            if (!comment) throw new NotFoundError("Comment not Found!");
            return comment;
        } catch (error) {
            throw error;
        }
    } 
    async getCommentsByPostId(postId: string) : Promise<any | null > {
        try { 
        if(mongoose.isValidObjectId(postId) === false) throw new NotFoundError("PostId is not valid!");
        const post: IPost | null = await Post.findById(postId).populate({ path: 'comments' });
        if (!post) throw new NotFoundError("Post not found!");
        const comments: any | null = post ? post.comments : null;
            if (!comments) throw new NotFoundError("No Comments was found!");
        return comments; 
        } catch (error) {
            throw error;
        } 
    }
    
    async createComment(content: string, userId: string, userName: string, postId: string): Promise<IComment | null> {
    const session = await mongoose.startSession(); 
    session.startTransaction();

    try {

        const post = await Post.findById(postId).session(session).exec();
        if (!post) {throw new NotFoundError("Post not found!");}
        const createdComments = await Comment.create(
            [{ content, userId, postId ,userName: userName }],
            { session }
        );
        const comment: IComment | null = createdComments[0];
        if (!comment) {
            throw new Error("Failed to create a comment!");
        }


        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: comment._id } },
            { new: true, session }
        ).exec();
        if (!updatedPost) {
            throw new Error("Failed to update the post with the new comment!");
        }

        await session.commitTransaction();
        session.endSession();

        return comment;
    } catch (error) {
        // Abort the transaction in case of an error
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}

    async updateComment(content: string, commentId: string) : Promise<IComment | null > {
        try { 
            const comment: IComment | null = await Comment.findByIdAndUpdate(commentId, { content: content },{new : true}).exec();
            if (!comment) throw new NotFoundError("Error on updating a comment!");
            return comment;
        } catch (error) {
            throw error;
        } 
    }
    async deleteComment(commentId: string) : Promise<void | null > {
        try { 
            const comment: IComment | null = await Comment.findOneAndDelete({ _id: commentId });
            if (!comment) throw new NotFoundError("Error on deleting a comment!");
        } catch (error) {
            throw error;
        } 
    }

}

export default new PostDataLayer(); 