import { IComment, IPost, IUser } from '../dp/schemas';
import { apiErrorHandling, NotFoundError, ValidationError , unCaughtErrorHandler} from '../util/errorHandling';
import  userService  from '../services/userServices';
import Messages from '../util/message';
import { sendResponse } from '../util/responsHandler';

export default class userController{
    public static getUserByName = async (req: any, res: any) => { 
        try {
            const userName: string = req.userName; 
            let fields: string[] = ["name"];
            const users: IUser[] = await userService.getUserByname(userName, fields);
            return sendResponse(res, 200, Messages.SUCCESS.FETCHED("users"), users);
        } catch (error) { 
             if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
             else unCaughtErrorHandler(error, res);
        }
    }
        public static getUserById = async (req: any, res: any) => { 
        try {
            const userId: string = req.userId; 
            let fields: string[] = ["name"];
            const user: IUser | null = await userService.getUserById(userId, fields);
            return sendResponse(res, 200, Messages.SUCCESS.FETCHED("user"), user);
        } catch (error) { 
             if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
             else unCaughtErrorHandler(error, res);
        }
    }
    
    public static getUserFiends = async (req: any, res: any) => { 
        try {
            const userId: string = req.user; 
            let fields : string[] = ["name"];
            const friends: IUser[] | null = await userService.getUserFriends(userId , fields);
            return sendResponse(res, 200, Messages.SUCCESS.FETCHED("friends"), friends);
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
            else unCaughtErrorHandler(error, res);
        }
    }
      public static getUserPosts = async (req: any, res: any) => { 
        try {
            const userId: string = req.user; 
            let fields : string[] = ["content" , "author" , "authorName" ,"numberOfComments"];
            const posts: IPost[] | null = await userService.getUserPosts(userId , fields);
            return sendResponse(res, 200, Messages.SUCCESS.FETCHED("posts"), posts);

        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
            else unCaughtErrorHandler(error, res);
        }
      }
      public static getUserComments = async (req: any, res: any) => { 
        try {
            const userId: string = req.user; 
            let fields : string[] = ["name"];
            const comments: IComment[] | null = await userService.getUserComments(userId , fields);
            return sendResponse(res, 200, Messages.SUCCESS.FETCHED("comments"), comments);
         } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
            else unCaughtErrorHandler(error, res);
        }
      }
     public static updateUser = async (req: any, res: any) => { 
        try {
            const userId: string = req.user;
            const { name, password } = req.body;
            if (!name && !password) throw new ValidationError("invalid data");
            let updatedUser: IUser | null = (name) ? await userService.updateUser(userId, { name: name }) :  await userService.updateUser(userId, { password: password });
            return sendResponse(res, 200, Messages.SUCCESS.UPDATED("user"), updatedUser);
     
    } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
            else unCaughtErrorHandler(error, res);
        }
      }
        public static deleteUser = async (req: any, res: any) => { 
        try {
            const userId: string = req.user; 
            await userService.deleteUser(userId);
            return sendResponse(res, 200, Messages.SUCCESS.DELETED("user"));
         } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
            else unCaughtErrorHandler(error, res);
        }
        }
    
   
    
}