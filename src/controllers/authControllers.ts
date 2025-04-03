import { Request, NextFunction } from "express";
import { IUser } from "../dp/schemas";
import { apiErrorHandling  , NotFoundError , ValidationError , unCaughtErrorHandler} from "../util/errorHandling";
import authServices from "../services/authServices";
import Messages from "../util/message";
import {sendResponse} from '../util/responsHandler';
const addUser = async (req: Request, res: any, next: NextFunction) => {

  try {
    const { name, password, email } = req.body;
    const user: IUser | null = await authServices.addUser(name, email, password);
    return sendResponse(res, 201, Messages.SUCCESS.CREATED("user"),user);
    }
  catch (error) { 
               if (error instanceof NotFoundError || error instanceof ValidationError)
                  apiErrorHandling(error, req, res, error.message , 400 );
               else unCaughtErrorHandler(error, res);
          }
};

const loginUser = async (req: Request, res: any, next: NextFunction) => {
  
  try {
    const { email, password } = req.body;
    const token: string | null = await authServices.loginUser(email, password); 
    return sendResponse(res, 200, Messages.SUCCESS.GENERAL("logging"),token);
  }
  catch (error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
            else unCaughtErrorHandler(error, res);
          }
  
};

const logoutUser = async (req: Request, res: any, next: NextFunction) => {
  try {
    const authorization: string = req.headers['authorization']!;
    const token: string = authorization.split(' ')[1];
    await authServices.logoutUser(token);
    return sendResponse(res, 200, Messages.SUCCESS.GENERAL("logging"),token);
  }
 catch (error) { 
            if (error instanceof NotFoundError || error instanceof ValidationError)
                apiErrorHandling(error, req, res, error.message , 400 );
            else unCaughtErrorHandler(error, res);
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
            else unCaughtErrorHandler(error, res);
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
            else unCaughtErrorHandler(error, res);
            }

};

export { addUser , loginUser , logoutUser , forgotPassword , resetPassword };
