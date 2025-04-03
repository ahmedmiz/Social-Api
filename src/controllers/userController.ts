import { IComment, IPost, IUser } from '../dp/schemas';
import { apiErrorHandling, NotFoundError, ValidationError , unCaughtErrorHandler} from '../util/errorHandling';
import  userService  from '../services/userServices';


export default class userController{
    public static getUserByName = async (req: any, res: any) => { 
        try {
            const userName: string = req.userName; 
            let fields: string[] = ["name"];
            const users: IUser[] | null = await userService.getUserByname(userName, fields);
            if (users) res.status(200).json({ users: users });
            else res.status(404).json({ message: "no users with such name" });
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
            if (user) res.status(200).json({ users: user });
            else res.status(404).json({ message: "no users with such name" });
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
            res.status(200).json({ friends: friends });
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
            if (posts.length) res.status(200).json({ posts: posts });
            else res.status(404).json({ message: "Posts not Found!" });
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
            if (comments.length) res.status(200).json({ comments: comments });
            else res.status(404).json({ message: "Comments not Found!" });
         } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
            else unCaughtErrorHandler(error, res);
        }
      }
    //  public static updateUser = async (req: any, res: any) => { 
    //     try {
    //         const userId: string = req.user;
    //
    // } catch (error) {
    //         if (error instanceof NotFoundError || error instanceof ValidationError)
    //             apiErrorHandling(error, req, res, error.message , 400 );
    //         else unCaughtErrorHandler(error, res);
    //     }
    //   }
        public static deleteUser = async (req: any, res: any) => { 
        try {
            const userId: string = req.user; 
            await userService.deleteUser(userId);
            res.status(200).json({message: "User was deleted successfully"})
         } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
            else unCaughtErrorHandler(error, res);
        }
        }
    
   
    
}