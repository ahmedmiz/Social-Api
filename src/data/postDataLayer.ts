import { Post  , Comment} from "../model/models";
import { IComment, IPost } from "../dp/schemas";
import { NotFoundError  } from "../util/errorHandling";

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
            const post: IPost | null = await Post.findById(postId).select(fieldSelector).exec();
            if (!post) throw new NotFoundError("Post not Found!");
            return post;
        } catch (error) {
            throw error;
        }
    } 
    async createPost(content: string, userId: string, userName: string) : Promise<IPost | null > {
        try {
            const post: IPost | null = await Post.create({ content, author: userId, authorName: userName });
            if (!post) throw new NotFoundError("Error on creating a post!");
            return post;
        } catch (error) {
            throw error;
        } 
    }
    async updatePostContent(content: string, postId: string) : Promise<IPost | null > {
        try { 
            const post: IPost | null = await Post.findByIdAndUpdate(postId, { content: content });
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
        const post: IPost | null = await Post.findById(postId).populate({ path: 'comments' });
        if (!post) throw new NotFoundError("Post not found!");
        const comments: any | null = post ? post.comments : null;
            if (!comments) throw new NotFoundError("No Comments was found!");
        return comments; 
        } catch (error) {
            throw error;
        } 
    }
    
    async createComment(content: string, userId: string, userName: string) : Promise<IComment | null > {
        try {
            const comment: IComment | null = await Comment.create({ content, author: userId, authorName: userName });
            if (!comment) throw new NotFoundError("Error on creating a comment!");
            return comment;
        } catch (error) {
            throw error;
        } 
    }
    async addCommentToPost( postId : string  ,commentId : string ): Promise<Boolean> { 
        try {
            await Post.findByIdAndUpdate(postId, { $push: { comments: commentId } }, { new: true });
            return true; 
        } catch (error) {
            throw error;
        }
    }
    async updateComment(content: string, commentId: string) : Promise<void | null > {
        try { 
            const comment: IComment | null = await Comment.findByIdAndUpdate(commentId, { content: content });
            if (!comment) throw new NotFoundError("Error on creating a comment!");
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