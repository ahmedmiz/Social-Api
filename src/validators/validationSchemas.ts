// src/validators/index.ts
import { z } from 'zod';

import mongoose from 'mongoose';
// Reusable schemas
const idSchema = z.string().refine(
  (id) => mongoose.Types.ObjectId.isValid(id),
  {
    message: 'Invalid ID'
  }
);



const emailSchema = z.string().email('Invalid email format');

const passwordSchema = z.string().min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');
  
const usernameSchema = z.string().min(3, 'Username must be at least 3 characters')
  .max(30, 'Username cannot exceed 30 characters')
    .regex(/^[a-zA-Z0-9._]+$/, 'Username can only contain letters, numbers, dots, and underscores');
  
const contentSchema = z.string().min(1, 'Content cannot be empty').max(5000, 'Content too long');

const urlSchema = z.string().url('Invalid URL format');
const dateSchema = z.string().datetime({ offset: true });

// User schemas
export const createUserSchema = z.object({
  body: z.object({
    name: usernameSchema,
    email: emailSchema,
    password: passwordSchema
  })
});

export const updateUserSchema = z.object({
  body: z.discriminatedUnion('updateType', [
     
      z.object({
          updateType: z.literal("email"),
          email: emailSchema 
    }),
    
    // Name update option
    z.object({
      updateType: z.literal('name'),
      name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    })
  ])
});

export const changePasswordSchema = z.object({
  params: z.object({
    userId: idSchema
  }),
  body: z.object({
    currentPassword: z.string(),
    newPassword: passwordSchema,
    confirmPassword: z.string()
  }).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  })
});

// Post schemas
export const createPostSchema = z.object({
  body: z.object({
    content: contentSchema,
  })
});

export const updatePostSchema = z.object({
  params: z.object({
    postId: idSchema
  }),
  body: z.object({
    content: contentSchema.optional(),
  })
});

// Comment schemas
export const createCommentSchema = z.object({
  params: z.object({
    postId: idSchema
  }),
  body: z.object({
    content: contentSchema,
  })
});

export const updateCommentSchema = z.object({
  params: z.object({
    commentId: idSchema
  }),
  body: z.object({
    content: contentSchema,
  })
});
