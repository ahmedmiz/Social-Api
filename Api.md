# API Documentation  
**Overview**: This API allows users to post , comment on post and add friends and much more.
**Base URL**: `http://localhost:3000`  
**Authentication**: Include an API key in the `Authorization` header: `Authorization: Bearer <your_api_key>`.  

## Endpoints:  
### Users  : `/users`
1. **Get All friends**: `GET /friends` - Retrieve all friends. 
Request body: `{}`
Response status: `200 OK`
Requires : `{Authentication}`
Response body: 
```json
[{"name":"friend-name" , "id" : "friend-id"}]
```
2. **Add friend**: `POST /friends/addFriend/:friendId` - add a friend by id. 
Request body: `{}`
Response status: `200 OK`
Requires : `{Authentication}`
Response body: 
```json
{"message":"Friend added successfully!"}
```
3. **Remove friend**: `DELETE /friends/removeFriend/:friendId` - add a friend by id. 
Request body: `{}`
Response status: `200 OK`
Requires : `{Authentication}`
Response body:
```json
{"message":"Friend removed successfully!"}
```

### Posts : `/posts`
1. **Get All posts**: `GET /:pageNumber` - Get posts by page number , ten posts per page. 
Request body: `{}`
Response status: `200 OK`
Requires : `{}`
Response body: List of posts
```json
[{"id":"post-id" , 
"content":"content" ,
"author":"author-id" , 
"authorName":"author name" , 
"numberOfComments" : "number of the comments on the post"}]
```
2. **Get Post by Id**: `GET /:postId` - Get a post by the Id. 
Request body: `{}`
Response status: `200 OK`
Requires : `{}`
Response body: Single post
```json
{"content":"content" ,
"author":"author-id" , 
"authorName":"author name" , 
"numberOfComments" : "number of the comments on the post"}
```
3. **Get Post by a user**: `GET /user/:userId` - Get posts by a user by his id . 
Request body: `{}`
Response status: `201`
Requires : `{}`
Response body: List of posts
```json
[{"id":"post-id"
"content":"content" ,
"author":"author-id" , 
"authorName":"author name" , 
"numberOfComments" : "number of the comments on the post"}]
```
4. **Create a Post**: `POST /create` - Create a post. 
Request body: `{"content" : "content text"}`
Response status: `201`
Requires : `{Authentication}`
Response body: message
```json
{"message" : "created a post successfully!"}
```
5. **Update a Post**: `PUT /update/:postId` - Update a post content by it's id. 
Request body: `{"content" : "new content text"}`
Response status: `200`
Requires : `{Authentication}`
Response body: message
```json
{"message" : "updated a post successfully!"}
```
6. **Delete a Post**: `DELETE /delete/:postId` - Delete a post by it's id. 
Request body: `{}`
Response status: `204`
Requires : `{Authentication}`
Response body: message
```json
{"message" : "deleted a post successfully!"}
```

7. **Get a comments by a Post**: `GET /:postId/comments` - Getting all comments on a post. 
Request body: `{}`
Response status: `200`
Requires : `{Authentication}`
Response body: List of comments
```json
[{"content" : "comment text content" ,
"authorId" : "comment author id" , 
"authorName" : "comment author name"}]
```
8. **Create a comment to a Post**: `POST /:postId/comments/create` - Creating a comment
Request body: `{
    "content" : "comment text content"
}`
Response status: `201`
Requires : `{Authentication}`
Response body: message
```json
{"message" : "created a comment successfully! "}
```
9. **Updating a comment to a Post**: `PUT /:postId/comments/update/:commentId` - 
Request body: `{
    "content" : "new comment text content"
}`
Response status: `200`
Requires : `{Authentication}`
Response body: message
```json
{"message" : "updated a comment successfully! "}
```
10. **Deleting a comment to a Post**: `DELETE /:postId/comments/delete/:commentId` - 
Request body: `{
    "content" : "new comment text content"
}`
Response status: `204`
Requires : `{Authentication}`
Response body: message
```json
{"message" : "deleted a comment successfully! "}
```
### Auth : `/auth`
1. **Register a user**: `POST /register` - Sign up new user .
Request body: `{
"name" : "user name" ,
"email :"example@example.com" ,
"password" : "password"}
}`
Response status: `201`
Requires : `{}`
Response body: message
```json
{"message" : "User added! " , "userId" : "user id" }
```
2. **Login a user**: `POST /login` - Sign in a user .
Request body: `{
"email :"example@example.com" ,
"password" : "password"}
}`
Response status: `200`
Requires : `{}`
Response body: message
```json
{ "token": "api jwt token" }
```
3. **Logout a user**: `POST /logout` 
Request body: `{}`
Response status: `200`
Requires : `{}`
Response body: message
```json
{ "message": "Logged out!" }
```

**Error Responses**:  
- `400 Bad Request`: Invalid input.  
- `401 Unauthorized`: Missing or invalid API key.  
- `404 Not Found`: Resource not found.  
- `500 Internal Server Error`: Server error.  

**Example Request**: `Getting list of friends`  
```js
fetch(baseUrl/users/friends, {  
  method: 'GET',  
  headers: {  
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json' 
  }  
})  
  .then(response => ()) 