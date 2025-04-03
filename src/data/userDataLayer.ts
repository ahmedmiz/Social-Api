import { User } from "../model/models";
import { IComment, IPost, IUser  } from "../dp/schemas";
import { NotFoundError } from "../util/errorHandling";
import IUserDataLayer from '../interfaces/data/IUserDataLayer';
 class UserDataLayer implements IUserDataLayer {
    async getUserByName(userName: string, fields: string[]): Promise<IUser[]> {
        try {
            const fieldSelector = fields.join(' ');
            const regex = new RegExp(userName, 'i');
            const users: IUser[]  = await User.find({ name: {$regex : regex}  }).select(fieldSelector).lean().exec();
            return users? users  : [] ;  
        } catch (error) { 
            throw error;
        }
    }
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
    async getUserFriends(userId: string ,fields: string[] ): Promise<IUser[]> {  
        try {  
            const fieldSelector = fields.join(' ');
            const user : IUser | null = await User.findById(userId).populate({path:'friends' , select : fieldSelector}).lean().exec();  
            if (!user) 
                throw new NotFoundError("User not found");  
           return user.friends || [];
        } catch (error) {  
            throw error; 
        }  
     } 
    async getUserPosts(userId: string, fields: string[]): Promise<IPost[]> { 
        try {
            const fieldSelector = fields.join(' ');
            const user: IUser | null = await User.findById(userId, { posts: 1 }).populate({ path: 'posts', select: fieldSelector }).lean().exec();
            if (!user) throw new NotFoundError("User not Found!");
            const posts: IPost[] = user.posts ? user.posts : [] ;
            return posts;
        } catch (error) {
            throw error;
        }
    }
     async  getUserComments(userId: string, fields: string[]): Promise<IComment[]> {
         try { 
             const fieldSelector = fields.join(' ');
             const user: IUser | null =  await User.findById(userId, { comments: 1 }).populate({ path: 'comments', select: fieldSelector }).lean().exec();
             if (!user) throw new NotFoundError("User not Found!");
             const comments: IComment[] = user.comments ? user.comments : [];
             return comments;
         } catch (error) { throw error}
     }
    async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null> {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true }).lean().exec();
            if (!updatedUser) throw new NotFoundError("User not Found!");
            return updatedUser;
        } catch (error) {
            throw error;
        } 
    }
     async deleteUser(userId: string): Promise<void> {
         try { 
             const user: IUser | null = await User.findByIdAndDelete(userId);
             if (!user) throw new NotFoundError("User not Found!");

         } catch (error) { 
             throw error;             
         }

     }

    
}

export default new UserDataLayer(); 