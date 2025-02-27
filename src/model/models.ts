import mongoose from "mongoose";
import { userSchema, postSchema, commentSchema , tokenBlacklistSchema , IPost , IUser , IComment } from "../dp/schemas";

const User = mongoose.model<IUser>("User", userSchema);
const Post = mongoose.model<IPost>("Post", postSchema);
const Comment = mongoose.model<IComment>("Comment", commentSchema);
const TokenBlackList = mongoose.model("TokenBlackList", tokenBlacklistSchema);
export { User, Post, Comment  , TokenBlackList};
