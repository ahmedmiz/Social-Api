import mongoose from "mongoose";

import { userSchema , IUser} from "../DB/userSchema";
import { postSchema , IPost} from '../DB/postSchema';
import { commentSchema, IComment } from '../DB/commentSchema';
import  tokenBlacklistSchema  from '../DB/tokenBlacklistSchema'


const User = mongoose.model<IUser>("User", userSchema);
const Post = mongoose.model<IPost>("Post", postSchema);
const Comment = mongoose.model<IComment>("Comment", commentSchema);
const TokenBlackList = mongoose.model("TokenBlackList", tokenBlacklistSchema);
export { User, Post, Comment  , TokenBlackList};
