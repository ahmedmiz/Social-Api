import{ Schema, Document, Types } from "mongoose";
import { IPost } from "./postSchema";
import { IComment } from "./commentSchema";
import { INotification } from "./notificationSchema";


enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR"
}

enum AccountStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  DEACTIVATED = "DEACTIVATED",
  PENDING = "PENDING"
}

interface IUser extends Document {
   _id: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  profilePicture: string;
  coverPhoto: string;
  bio: string;
  dateOfBirth: Date;
  gender: string;
  phoneNumber: string;
  location: {
    country: string;
    city: string;
    address: string;
  };
  role: UserRole;
  accountStatus: AccountStatus;
  verified: boolean;
  friends: IUser[];
  followers: IUser[];
  following: IUser[];
  blockedUsers: IUser[];
  posts: IPost[];
  comments: IComment[];
  notifications: INotification[];
  savedPosts: IPost[];
  interests: string[];
  education: [{
    institution: string;
    degree: string;
    year: number;
  }];
  work: [{
    company: string;
    position: string;
    from: Date;
    to: Date;
    current: boolean;
  }];
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  lastLogin: Date;
  isOnline: boolean;
  resetToken: string;
  resetTokenExpiresAt: Date;
  emailVerificationToken: string;
  emailVerificationExpiresAt: Date;
  twoFactorEnabled: boolean;
  twoFactorSecret: string;
  loginAttempts: number;
  lockUntil: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  profilePicture: {
    type: String,
    default: "default-avatar.png",
  },
  coverPhoto: {
    type: String,
    default: "default-cover.png",
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  dateOfBirth: Date,
  gender: String,
  phoneNumber: String,
  location: {
    country: String,
    city: String,
    address: String,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  },
  accountStatus: {
    type: String,
    enum: Object.values(AccountStatus),
    default: AccountStatus.PENDING,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  friends: [{ 
    type: Schema.Types.ObjectId,
    ref: "User" 
  }],
  followers: [{ 
    type: Schema.Types.ObjectId,
    ref: "User" 
  }],
  following: [{ 
    type: Schema.Types.ObjectId,
    ref: "User" 
  }],
  blockedUsers: [{ 
    type: Schema.Types.ObjectId,
    ref: "User" 
  }],
  posts: [{ 
    type: Schema.Types.ObjectId,
    ref: "Post" 
  }],
  comments: [{ 
    type: Schema.Types.ObjectId,
    ref: "Comment" 
  }],
  notifications: [{ 
    type: Schema.Types.ObjectId,
    ref: "UserNotification" 
  }],
  savedPosts: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }],
  interests: [String],
  education: [{
    institution: String,
    degree: String,
    year: Number,
  }],
  work: [{
    company: String,
    position: String,
    from: Date,
    to: Date,
    current: Boolean,
  }],
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    website: String,
  },
  lastLogin: Date,
  isOnline: {
    type: Boolean,
    default: false,
  },
  resetToken: String,
  resetTokenExpiresAt: Date,
  emailVerificationToken: String,
  emailVerificationExpiresAt: Date,
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  twoFactorSecret: String,
  loginAttempts: {
    type: Number,
    default: 0,
  },
  lockUntil: Date,
}, { 
  timestamps: true,
  autoIndex: true 
});

// Add indexes for frequently queried fields
userSchema.index({ email: 1, name: 1 });
userSchema.index({ accountStatus: 1 });
userSchema.index({ "location.country": 1, "location.city": 1 });

export { userSchema, IUser, UserRole, AccountStatus };