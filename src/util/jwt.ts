import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : "your-secret-key";


export const generateToken = (userId: string , userName : string): string => {
  return jwt.sign({ userId , userName }, JWT_SECRET, { expiresIn: '7h' });
};
export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};