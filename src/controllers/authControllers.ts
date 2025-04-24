import { Request, NextFunction } from "express";
import { IUser } from "../DB/userSchema";
import { apiErrorHandling  , NotFoundError , ValidationError , unCaughtErrorHandler} from "../util/errorHandling";
import authServices from "../services/authServices";
import Messages from "../util/message";
import {sendResponse} from '../util/responsHandler';
const addUser = async (req: Request, res: any, next: NextFunction) => {

  try {
    const name = req.body.name;
    const email = req.body.email; 
    const password = req.body.password;
    const user: IUser | null = await authServices.addUser(name, email, password);
    return sendResponse(res, 201, Messages.SUCCESS.CREATED("user"),user);
    }
  catch (error) { 
               if (error instanceof NotFoundError || error instanceof ValidationError)
                  apiErrorHandling(error, req, res, error.message , 400 );
               else unCaughtErrorHandler(error, req ,res , next);
          }
};

const loginUser = async (req: Request, res: any, next: NextFunction) => {
  
  try {
    const { email, password } = req.body;
    const token: string | null = await authServices.loginUser(email, password); 
    return sendResponse(res, 200, Messages.SUCCESS.GENERAL("log in"),token);
  }
  catch (error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
                else unCaughtErrorHandler(error, req ,res , next);

          }
  
};

const logoutUser = async (req: Request, res: any, next: NextFunction) => {
  try {
    const authorization: string = req.headers['authorization']!;
    const token: string = authorization.split(' ')[1];
    await authServices.logoutUser(token);
    return sendResponse(res, 200, Messages.SUCCESS.GENERAL("logout"),token);
  }
 catch (error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
            else unCaughtErrorHandler(error, req ,res , next);
              }
};



const forgotPassword = async (req: Request, res: any, next: NextFunction) => {
  
  try {
    const email: string = req.body.email;
    await authServices.forgotPassword(email);
   return sendResponse(res, 201, "please check your email for OTP.");
  } catch (error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
            else unCaughtErrorHandler(error, req ,res , next);
              }
};

const resetPassword = async (req: Request, res: any, next: NextFunction) => {
  try {
    const {email, newPassword, token} = req.body; 
    await authServices.resetPassword(token, email, newPassword);
    return sendResponse(res, 200, Messages.SUCCESS.GENERAL("reseting password"));
  }  catch (error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
            else unCaughtErrorHandler(error, req ,res , next);
            }

};

export { addUser , loginUser , logoutUser , forgotPassword , resetPassword };
