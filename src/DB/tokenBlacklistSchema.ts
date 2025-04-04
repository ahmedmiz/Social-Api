import  { Schema } from "mongoose";
const tokenBlacklistSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
}, { timestamps: true, autoIndex: false });
export default tokenBlacklistSchema;