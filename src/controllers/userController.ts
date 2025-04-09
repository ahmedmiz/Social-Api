import { IPost } from "../DB/postSchema";
import { IComment } from '../DB/commentSchema';
import { IUser } from "../DB/userSchema";
import { apiErrorHandling, NotFoundError, ValidationError , unCaughtErrorHandler} from '../util/errorHandling';
import  userService  from '../services/userServices';
import Messages from '../util/message';
import { sendResponse } from '../util/responsHandler';
import { Request, Response, NextFunction } from 'express';

export default class userController{
    public static getUser = async (req: any, res: Response, next: NextFunction) => { 
        try {
            const { name, id } = req.query;
            let fields: string[] = ["name"];
            if (name) {
                const users: IUser[] = await userService.getUserByname(name, fields);
                return sendResponse(res, 200, Messages.SUCCESS.FETCHED("users"), users);
            } else { 
            const user: IUser | null = await userService.getUserById(id, fields);
            return sendResponse(res, 200, Messages.SUCCESS.FETCHED("user"), user);
            }
        } catch (error) { 
             if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
                         else unCaughtErrorHandler(error, req ,res , next);

        }
    }
        
    
    public static getUserFiends = async (req: any, res: Response, next: NextFunction) => { 
        try {
            const userId: string = req.user; 
            let fields : string[] = ["name"];
            const friends: IUser[] | null = await userService.getUserFriends(userId , fields);
            return sendResponse(res, 200, Messages.SUCCESS.FETCHED("friends"), friends);
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
                                                  else unCaughtErrorHandler(error, req ,res , next);

        }
    }
      public static getUserPosts = async (req: any, res: Response, next: NextFunction) => { 
        try {
            const userId: string = req.userId;
            let fields : string[] = ["content" , "author" , "authorName" ,"numberOfComments"];
            const posts: IPost[] | null = await userService.getUserPosts(userId , fields);
            return sendResponse(res, 200, Messages.SUCCESS.FETCHED("posts"), posts);

        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
                                                  else unCaughtErrorHandler(error, req ,res , next);

        }
      }
      public static getUserComments = async (req: any, res: Response, next: NextFunction) => { 
        try {
            const userId: string = req.userId; 
            let fields : string[] = ["content" , "postId" , "userName" ];
            const comments: IComment[] = await userService.getUserComments(userId, fields);

            return sendResponse(res, 200, Messages.SUCCESS.FETCHED("comments"), comments);
         } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
                                                  else unCaughtErrorHandler(error, req ,res , next);

        }
      }
     public static updateUser = async (req: any, res: Response, next: NextFunction) => { 
        try {
            const userId: string = req.userId;
            const { name, email } = req.body;
            if (!name && !email) throw new ValidationError("invalid data");
            let updatedUser: IUser | null = (name) ? await userService.updateUser(userId, { name: name }) :  await userService.updateUser(userId, { email: email });
            return sendResponse(res, 200, Messages.SUCCESS.UPDATED("user"), updatedUser);
     
    } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
                                                  else unCaughtErrorHandler(error, req ,res , next);

        }
      }
        public static deleteUser = async (req: any, res: Response, next: NextFunction) => { 
        try {
            const userId: string = req.userId; 
            await userService.deleteUser(userId);
            return sendResponse(res, 200, Messages.SUCCESS.DELETED("user"));
         } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
                                                  else unCaughtErrorHandler(error, req ,res , next);

        }
        }
    public static getUserNotifications = async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.userId;
            const notifications = await userService.getUserNotifiactions(userId);
            return sendResponse(res, 200, Messages.SUCCESS.FETCHED("notifications"), notifications);
        }
        catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message, 400);
            else unCaughtErrorHandler(error, req, res, next);

        }
    }
    public static addFriend = async (req: any, res: Response, next: NextFunction) => { 
        try {
            const userId: string = req.userId; 
            const userName: string = req.userName; 
            const friendId: string = req.body.friendId; 
            await userService.addFriend(userId , userName , friendId); 
            return sendResponse(res, 200, Messages.SUCCESS.GENERAL("Request was sent"));
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message, 400);
            else unCaughtErrorHandler(error, req, res, next);

        }
    }
    
   
    
}