import { Request, Response, NextFunction } from "express";
import { User } from "../model/models";
import Hashing from "../util/hashing";
import { generateToken } from "../util/jwt";
import { TokenBlackList } from "../model/models";
import { IUser } from "../dp/schemas";
import mongoose from "mongoose";
import { apiErrorHandling } from "../util/errorHandling";
import sendEmail from "../util/sendEmail";
import generateResetToken from "../util/generateToken";
const addUser = async (req: Request, res: any, next: NextFunction) => {

  try {
    const { name, password, email } = req.body;
    const hashedPassword: string = await Hashing.hashPassword(password);
    const oldUser = await User.findOne({ email: email });
    if (oldUser) return res.status(400).json({ message: "User already exists!" });
    else {
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      await user.save();
      res.status(200).json({ message: "User added!" , userId : user._id });
    }
  } catch (error) {
    apiErrorHandling(error, req, res, "Error adding a user!");
  }
};

const loginUser = async (req: Request, res: any, next: NextFunction) => {
  
  try {
    const { email, password } = req.body;
    const user: IUser | null  = await User.findOne({ email: email })!; 
    if (!user) return res.json({ message: "User not found!" });
    const isMatch: boolean = await Hashing.comparePassword(password, user.password);
    if (!isMatch) return res.json({ message: "Invalid credentials!" });
    const userIdObj: mongoose.Types.ObjectId    = user._id as mongoose.Types.ObjectId; 
    const token: string = generateToken(userIdObj.toString() ,user.name );
    res.status(200).json({ token: token });
  } catch (error) { 
 apiErrorHandling(error, req, res, "Error logging in a user!");
  }
  
};

const logoutUser = async (req: Request, res: any, next: NextFunction) => {
  try {
    const authorization: string = req.headers['authorization']!;
    const token: string = authorization.split(' ')[1];
    const tokenBlackList = new TokenBlackList({ token: token });
    await tokenBlackList.save();
    res.status(200).json({ message: "Logged out!" });
  } catch (error) { 
    apiErrorHandling(error, req, res, "Error logging out  a user!");
  }
};

// const refreshUser = (req: Request, res: Response, next: NextFunction) => {};

const forgotPassword = async (req: Request, res: any, next: NextFunction) => {
  const email: string = req.body.email;
  try {
    const user: IUser | null = await User.findOne({ email: email }); 
    if (!user) return res.status(400).json({ message: "User not Found!" });
    const userName: string = user.name;
    const token: string = generateResetToken(); 
    const now = new Date(); 
    const expireTime : Date = new Date(now.getTime() + 30 * 60 * 1000);
    user.updateOne({ resetToken: token, resetTokenExpiresAt: expireTime });
    await user.save();
    const emailSendingResult: any = await sendEmail(email, userName, token);
    if (!emailSendingResult) res.status(404).json({ message: "field to send Email!" });
    res.status(200).json({ message: "please check your email for one time password" });
  } catch (error) { 
    apiErrorHandling(error, req, res, "User not Found!");
  }
};

const resetPassword = async (req: Request, res: any, next: NextFunction) => {
  try {
    const email: string = req.body.email;
    const newPassword: string = req.body.newPassword;
    const token: string = req.body.token;
    const user: IUser | null = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User not Found!" });
    const userToken: string = user.resetToken;
    const resetTokenExpiresAt: Date = user.resetTokenExpiresAt;
    const now = new Date();
    if (userToken !== token || now > resetTokenExpiresAt)
      return res.status(201).json({ message: "Wrong one Time Password!" });
    const newPasswordHashed = await Hashing.hashPassword(newPassword);
    user.updateOne({ password: newPasswordHashed });
    await user.save();
    res.status(201).json({message:"Password changed successfully"})
  } catch (error) { 
    apiErrorHandling(error, req, res, "error on resetting password!");
  }

};

export { addUser , loginUser , logoutUser , forgotPassword , resetPassword };
