import IAuthServices from '../interfaces/services/IAuthServices';
import { IUser } from '../DB/userSchema';
import Hashing from "../util/hashing";
import { generateToken } from "../util/jwt";
import { TokenBlackList } from "../model/models";
import {NotFoundError, ValidationError } from "../util/errorHandling";
import sendEmail from "../util/sendEmail";
import generateResetToken from "../util/generateToken";
import userDataLayer from '../data/userDataLayer';
class authServices implements IAuthServices { 
    async addUser(name: string, email: string, password: string): Promise<IUser | null> {
        try { 
            const hashedPassword: string = await Hashing.hashPassword(password);
            const newUser: IUser | null = await userDataLayer.addUser(name, email, hashedPassword);
            return newUser; 
        } catch (error) { 
            throw error;
        }
    }
    async loginUser(email: string, password: string): Promise<string | null> { 
        try { 
            const user: IUser | null = await userDataLayer.getUserByEmail(email, ["email", "password" , "name"]);
            if (!user) throw new NotFoundError("user not found!");
            const isMatch: boolean = await Hashing.comparePassword(password, user!.password);
            if (!isMatch) throw new ValidationError("Invalid credentials!");
            const userId: string = user.id;
            const token: string = generateToken(userId ,user.name );
            return token;

        } catch (error) {
            throw error;
         }
    }
    async logoutUser(token: string): Promise<boolean> {
        try { 
         const tokenBlackList = new TokenBlackList({ token: token });
         await tokenBlackList.save();
         return true; 
        } catch (error) {
            throw error;
         }
    }
     async forgotPassword(email: string): Promise<boolean> {
         try { 
             const user: IUser | null = await userDataLayer.getUserByEmail(email, ["name", "password"]);
             if (!user) throw new NotFoundError("user not found!");
             const userName: string = user.name;
             const token: string = generateResetToken(); 
             const now = new Date(); 
             const expireTime : Date = new Date(now.getTime() + 30 * 60 * 1000);
             user.updateOne({ resetToken: token, resetTokenExpiresAt: expireTime });
             await user.save();
             const emailSendingResult: any = await sendEmail(email, userName, token);
             if (!emailSendingResult) throw new NotFoundError("field to send Email!");
             return true; 
                 
         } catch (error) { 
             throw error;
         }   
     }
    async resetPassword(OTP: string, email: string, newPassword: string): Promise<boolean> {
        try {
            const user: IUser | null = await userDataLayer.getUserByEmail(email, ["name", "resetToken", "resetTokenExpiresAt"]);
            if (!user) throw new NotFoundError("user not found!");
            const now = new Date();
            if (user.resetToken !== OTP || now > user.resetTokenExpiresAt)
                throw new ValidationError("Invalid credentials!");
            const newPasswordHashed: string = await Hashing.hashPassword(newPassword);
            await userDataLayer.updateUser(user.id, { password: newPasswordHashed });
            return true;
        } catch (error) {
            throw error;
        }
    }
}

export default new authServices();