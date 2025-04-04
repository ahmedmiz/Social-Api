import { IUser } from "../../DB/userSchema";

export default interface IAuthServices { 
    addUser(name: string, email: string, password: string): Promise<IUser | null>; 
    loginUser(email: string, password: string): Promise<string | null>; 
    logoutUser(token: string): Promise<boolean>;
    forgotPassword(email: string): Promise<boolean>;
    resetPassword(OTP: string, email: string, newPassword: string): Promise<boolean>;
}
