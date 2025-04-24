import { User, UserNotification } from "../model/models";
import { IComment } from "../DB/commentSchema";
import { IPost } from "../DB/postSchema";
import { IUser } from "../DB/userSchema";
import { NotFoundError, ValidationError } from "../util/errorHandling";
import IUserDataLayer from '../interfaces/dataLayer/IUserDataLayer';
import { INotification, INotificationObject } from "../DB/notificationSchema";
import mongoose from "mongoose";
class UserDataLayer implements IUserDataLayer {
    async addUser(name : string , email: string, password: string): Promise<IUser | null> { 
        try { 
            const oldUser = await User.findOne({ email: email });
            if (oldUser) throw new ValidationError("User already exist");
        const user = new User({
        name: name,
        email: email,
        password: password,
        });
            const savedUser = await user.save();
            const newUser: IUser | null = savedUser.toObject() as IUser;
            return newUser;
        } catch (error) {
            throw error;
         }
    }
    async getUserByEmail(email: string, fields: string[]): Promise<IUser | null> { 
        try {
            const fieldSelector = fields.join(' ');
            const user: IUser | null = await User.findOne({ email: email }).select(fieldSelector).lean().exec();
            return user;
        } catch (error) { 
            throw error;
        }
    }
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
            if (!updatedUser) { throw new NotFoundError("User not Found!"); }
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
    async getUserNotifiactions(userId: string): Promise<INotification[]> { 
        try { 
            const user: IUser | null = await User.findById(userId, { notifications: 1 }).populate({ path: 'notifications', select: 'message createdAt' }).lean().exec();
            if (!user) throw new NotFoundError("User not Found!");
            return user.notifications ? user.notifications : [];
        } catch (error) {
            throw error;
         }
    }
    async addNotificationToUser(userId: string , notification : INotificationObject ): Promise<void> { 
        const session = await mongoose.startSession(); 
        session.startTransaction();
        try { 
            
            const notificationDB = await UserNotification.create({ ...notification }, {session});
            await User.findByIdAndUpdate(userId, { $push: { notifications: { ...notification } } }, { new: true, session }).exec();
            await session.commitTransaction();
            await session.endSession();
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw error;
         }
    }
    

    
}

export default new UserDataLayer(); 