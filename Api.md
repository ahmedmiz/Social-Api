# API Documentation  

**Overview**: This API allows users to post, comment on posts, manage friends, and handle user authentication.  
**Base URL**: `http://localhost:3000`  
**Authentication**: Include an API key in the `Authorization` header: `Authorization: Bearer <your_api_key>`.  

## Endpoints  

### Users: `/users`

1. **Get Users by Name Prefix**: `GET /:userName`  
   - Retrieve all users with a name prefix.  
   - Requires: `{}`  
   - Response:  

     ```json
     {
       "success": true,
       "message": "users retrieved successfully.",
       "data": [{ "users": [IUser] }]
     }
     ```

2. **Get User by ID**: `GET /:userId`  
   - Retrieve a user by their ID.  
   - Requires: `{}`  
   - Response:  

     ```json
     {
       "success": true,
       "message": "user retrieved successfully.",
       "data": { "User": IUser }
     }
     ```

3. **Get All Friends**: `GET /friends`  
   - Retrieve all friends of the authenticated user.  
   - Requires: `{Authentication}`  
   - Response:  

     ```json
     {
       "success": true,
       "message": "friends retrieved successfully.",
       "data": [{ "friends": [IUser] }]
     }
     ```

4. **Get User's Posts**: `GET /posts`  
   - Retrieve all posts of the authenticated user.  
   - Requires: `{Authentication}`  
   - Response:  

     ```json
     {
       "success": true,
       "message": "posts retrieved successfully.",
       "data": [{ "posts": [IPost] }]
     }
     ```

5. **Get User's Comments**: `GET /comments`  
   - Retrieve all comments of the authenticated user.  
   - Requires: `{Authentication}`  
   - Response:  

     ```json
     {
       "success": true,
       "message": "comments retrieved successfully.",
       "data": [{ "comments": [IComment] }]
     }
     ```

6. **Update User Name**: `PATCH /userName`  
   - Update the authenticated user's name.  
   - Requires: `{Authentication}`  
   - Request Body:  

     ```json
     { "userName": "new name" }
     ```  

   - Response:  

     ```json
     {
       "success": true,
       "message": "user updated successfully.",
       "data": { "User": IUser }
     }
     ```

7. **Delete User**: `DELETE /`  
   - Delete the authenticated user.  
   - Requires: `{Authentication}`  
   - Response:  

     ```json
     {
       "success": true,
       "message": "user deleted successfully."
     }
     ```

---

### Feed: `/feed`

1. **Get All Posts**: `GET /`  
   - Retrieve all posts with pagination.  
   - Requires: `{}`  
   - Response:  

     ```json
     {
       "success": true,
       "message": "posts retrieved successfully.",
       "data": [{ "posts": [IPost] }]
     }
     ```

2. **Get Post by ID**: `GET /:postId`  
   - Retrieve a post by its ID.  
   - Requires: `{}`  
   - Response:  

     ```json
     {
       "success": true,
       "message": "post retrieved successfully.",
       "data": { "Post": IPost }
     }
     ```

3. **Create a Post**: `POST /`  
   - Create a new post.  
   - Requires: `{Authentication}`  
   - Request Body:  

     ```json
     { "content": "post content" }
     ```  

   - Response:  

     ```json
     {
       "success": true,
       "message": "post created successfully.",
       "data": { "Post": IPost }
     }
     ```

4. **Update a Post**: `PATCH /:postId`  
   - Update a post's content by its ID.  
   - Requires: `{Authentication}`  
   - Request Body:  

     ```json
     { "content": "updated content" }
     ```  

   - Response:  

     ```json
     {
       "success": true,
       "message": "post updated successfully.",
       "data": { "Post": IPost }
     }
     ```

5. **Delete a Post**: `DELETE /:postId`  
   - Delete a post by its ID.  
   - Requires: `{Authentication}`  
   - Response:  

     ```json
     {
       "success": true,
       "message": "post deleted successfully."
     }
     ```

6. **Get Comments by Post ID**: `GET /:postId/comments`  
   - Retrieve all comments on a post.  
   - Requires: `{}`  
   - Response:  

     ```json
     {
       "success": true,
       "message": "comments retrieved successfully.",
       "data": [{ "comments": [IComment] }]
     }
     ```

7. **Create a Comment**: `POST /:postId/comments`  
   - Create a comment on a post.  
   - Requires: `{Authentication}`  
   - Request Body:  

     ```json
     { "content": "comment content" }
     ```  

   - Response:  

     ```json
     {
       "success": true,
       "message": "comment created successfully.",
       "data": { "Comment": IComment }
     }
     ```

8. **Update a Comment**: `PATCH /comments/:commentId`  
   - Update a comment's content by its ID.  
   - Requires: `{Authentication}`  
   - Request Body:  

     ```json
     { "content": "updated comment content" }
     ```  

   - Response:  

     ```json
     {
       "success": true,
       "message": "comment updated successfully.",
       "data": { "Comment": IComment }
     }
     ```

9. **Delete a Comment**: `DELETE /comments/:commentId`  
   - Delete a comment by its ID.  
   - Requires: `{Authentication}`  
   - Response:  

     ```json
     {
       "success": true,
       "message": "comment deleted successfully."
     }
     ```

---

### Auth: `/auth`

1. **Register a User**: `POST /register`  
   - Register a new user.  
   - Requires: `{}`  
   - Request Body:  

     ```json
     { "name": "user name", "email": "example@example.com", "password": "password" }
     ```  

   - Response:  

     ```json
     {
       "success": true,
       "message": "user registered successfully.",
       "data": { "User": IUser }
     }
     ```

2. **Login a User**: `POST /login`  
   - Log in a user.  
   - Requires: `{}`  
   - Request Body:  

     ```json
     { "email": "example@example.com", "password": "password" }
     ```  

   - Response:  

     ```json
     {
       "success": true,
       "message": "login succeeded.",
       "data": { "token": "jwt token" }
     }
     ```

3. **Logout a User**: `POST /logout`  
   - Log out the authenticated user.  
   - Requires: `{Authentication}`  
   - Response:  

     ```json
     {
       "success": true,
       "message": "logout succeeded."
     }
     ```

4. **Forgot Password**: `POST /forgotPassword`  
   - Send a forgot password email with an OTP.  
   - Requires: `{}`  
   - Request Body:  

     ```json
     { "email": "example@example.com" }
     ```  

   - Response:  

     ```json
     {
       "success": true,
       "message": "please check your email for OTP."
     }
     ```

5. **Reset Password**: `POST /resetPassword`  
   - Reset the user's password.  
   - Requires: `{}`  
   - Request Body:  

     ```json
     { "email": "example@example.com", "newPassword": "new password", "token": "otp token" }
     ```  

   - Response:  

     ```json
     {
       "success": true,
       "message": "password reset succeeded."
     }
     ```

---

### Data Models  

#### IUser  

Represents a user in the system.  

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "createdAt": "string (ISO 8601 date)",
  "updatedAt": "string (ISO 8601 date)"
}
```

#### IPost  

Represents a post in the system.  

```json
{
  "id": "string",
  "content": "string",
  "userId": "string",
  "userName": "string",
  "numberOfComments": "number",
  "createdAt": "string (ISO 8601 date)",
  "updatedAt": "string (ISO 8601 date)"
}
```

#### IComment  

Represents a comment in the system.  

```json
{
  "id": "string",
  "content": "string",
  "userId": "string",
  "userName": "string",
  "postId": "string",
  "createdAt": "string (ISO 8601 date)",
  "updatedAt": "string (ISO 8601 date)"
}
```

**Error Responses**:  

- `400 Bad Request`: Invalid input.  
- `401 Unauthorized`: Missing or invalid API key.  
- `403 Forbidden`: Access denied.  
- `404 Not Found`: Resource not found.  
- `500 Internal Server Error`: Server error.
