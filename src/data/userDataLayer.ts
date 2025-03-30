import { User } from "../model/models";
import { IUser  } from "../dp/schemas";
import { NotFoundError } from "../util/errorHandling";

 class UserDataLayer {

    async getUserById(userId: string, fields: string[]): Promise<IUser | null> {
        try {
            const fieldSelector = fields.join(' ');
            const user: IUser | null = await User.findById(userId).select(fieldSelector).lean().exec();
            if (!user) throw new NotFoundError("User not Found!");
            return user;
        } catch (error) {
            throw error;
        }
    }
    async getUserFriends(userId: string ,fields: string[] ): Promise<any> {  
        try {  
            const fieldSelector = fields.join(' ');
            const user = await User.findById(userId).populate({path:'friends' , select : fieldSelector}).lean().exec();  
            if (!user) 
                throw new NotFoundError("User not found");  
            return user.friends;  
        } catch (error) {  
            throw error; 
        }  
    }  
    async updateUserById(userId: string, userData: Partial<IUser>): Promise<IUser | null> {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true }).lean().exec();
            if (!updatedUser) throw new NotFoundError("User not Found!");
            return updatedUser;
        } catch (error) {
            throw error;
        }
        
    }
    async getUserPostsById(userId: string, fields: string[]): Promise<any> { 
        try {
            const fieldSelector = fields.join(' ');
            const user: IUser | null = await User.findById(userId, { posts: 1 }).populate({ path: 'posts', select: fieldSelector }).lean().exec();
            const userPosts: any  = user ? (user.posts ) : null; 
            if (!userPosts) throw new NotFoundError("User not Found!");
            return userPosts;
        } catch (error) {
            throw error;
        }
    }
    async addPostToUser( userId : string  ,postId : string ): Promise<Boolean> { 
        try {
            await User.findByIdAndUpdate(userId, { $push: { posts: postId } }, { new: true });
            return true; 
        } catch (error) {
            throw error;
        }
    }
}

export default new UserDataLayer(); 