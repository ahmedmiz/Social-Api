# users

1. Get all user friends

- GET [](http://localhost:3000/users/frindes)
  Headers : Authorization: Bearer YOUR_JWT_TOKEN

```json
Req {}
// status 200 OK
Res {
[{
    "id" : "friendID",
    "name" :"friend one ",
    "image":"imageUrl",
    "createdAt":"timeCreatedAT"
} , {
    "id" : "friendID",
    "name" :"friend two ",
    "image":"imageUrl",
    "createdAt":"timeCreatedAT"
}]
}
// status 401 Unauthorized
Res {
     "error": "Please Login."
}
```

Middlewares { rateLimiting , logs , auth }

2. Add friend by Id.

- POST [](http://localhost:3000/users/frindes/addfriend/:friendId)
  Authorization: Bearer YOUR_JWT_TOKEN

```json
Req {}
// status 200 OK
Res {
"message" : "request sent!"
}
// status 401 Unauthorized
Res {
     "error": "Please Login."
}
```

Middlewares {Validation , StrictRateLimiting , logs , auth }

3. Remove friend by Id.

- DELETE [](http://localhost:3000/users/frindes/deleteFriend/:friendId)
  Headers : Authorization: Bearer YOUR_JWT_TOKEN

```json
Req {}
// status 200 OK
Res {
"message" : "friend removed!"
}
// status 401 Unauthorized
Res {
     "error": "Please Login."
}
```

Middlewares {Validation , StrictRateLimiting , logs , auth }

# posts

4. Fetch all posts (with pagination and sorting).

- GET [](http://localhost:3000/posts)

```json
Req {}
// status 200 OK
Res {
[{
 "createdBy" :  "name of creator",
 "creatorID" : "creatorID" ,
 "text" : "postText",
 "imageUrl" : "image if exist",
 "createdAt"  :"Date of creation",
 "number of reactions" : ""
} , {} , {}]
}
// status 401 Unauthorized
Res {
     "error": "Invalid email or password."
}
```

Middlewares {Validation , StrictRateLimiting , logs }

5. Fetch a single post by ID.

- GET [](http://localhost:3000/posts/:id)

```json
Req {}
// status 200 OK
Res {
 "createdBy" :  "name of creator",
 "creatorID" : "creatorID" ,
 "text" : "postText",
 "imageUrl" : "image if exist",
 "createdAt"  :"Date of creation",
 "number of reactions" : ""
}
// status 404 Unauthorized
Res {
     "error": "Post Not Found"
}
```

Middlewares {Validation , StrictRateLimiting , logs }

6. Fetch all posts by single user.

- GET [](http://localhost:3000/posts/user/:userId)

```json
Req {  }
// status 200 OK
Res {
{
 "createdBy" :  "name of creator",
 "creatorID" : "creatorID" ,
 "text" : "postText",
 "imageUrl" : "image if exist",
 "createdAt"  :"Date of creation",
 "number of reactions" : ""
} , {} , {}
}
// status 404 Not Found
Res {
     "error": "User Not Found."
}
```

Middlewares {Validation , StrictRateLimiting , logs }

POST [](http://localhost:3000/posts/create) - Create a new post.
Headers : Authorization: Bearer YOUR_JWT_TOKEN

```json
Req {"text" : "post body" , "image" : "image url"}
// status 200 OK
Res {
        "message" : "Successfully created a post!",
        "postId" : "id"
}
// status 401 Unauthorized
Res {
     "error": "Invalid email or password."
}
```

Middlewares {auth ,Validation , StrictRateLimiting , logs }
delete [](http://localhost:3000/posts/delete/:postId) - delete a new post.
Headers : Authorization: Bearer YOUR_JWT_TOKEN

```json
Req {}
// status 200 OK
Res {
        "message" : "Successfully deleted a post!"
}
// status 401 Unauthorized
Res {
     "error": "Invalid email or password."
}
```

Middlewares {auth ,Validation , StrictRateLimiting , logs }

PUT [](http://localhost:3000/posts/update/:postId) - update a new post.
Headers : Authorization: Bearer YOUR_JWT_TOKEN

```json
Req {"text" : "post body" , "image" : "image url"}
// status 200 OK
Res {
        "message" : "Successfully updated a post!",
        "postId" : "id"
}
// status 401 Unauthorized
Res {
     "error": "Invalid email or password."
}
```

Middlewares {auth ,Validation , StrictRateLimiting , logs }

# comments

GET [](http://localhost:3000/posts/:postId/comments) - Fetch all post reactions

```json
Req {}
// status 200 OK
Res {
[{
    "name" : "johnExample" ,
    "ReactorId"   : "ReactorId"
    "type" : "like"
} , {
    "name" : "johnExample" ,
    "ReactorId": "ReactorId"
    "type" : "like"}
]
}
// status 404 Unauthorized
Res {
     "error": "Not found"
}
```

Middlewares {Validation , StrictRateLimiting , logs }

POST [](http://localhost:3000/posts/:postId/reactoins) - Add reaction to a post

# auth

POST [](http://localhost:3000/auth/register) - Register new user

```json
Req { "email": "user@example.com", "password": "securePassword123" , "username": "new_user" }
// status 201 Created
Res {
"user": {"id": 1,"email": "user@example.com", "username": "john_doe"}
}
// status 400 Bad Request
Res {
     "error": "Invalid email or password."
}
```

Middlewares {Validation , StrictRateLimiting , logs }

POST [](http://localhost:3000/auth/login) - Login new user

```json
Req { "email": "user@example.com", "password": "securePassword123" }
// status 200 OK
Res {
"token": "JWT...",
"user": {"id": 1,"email": "user@example.com", "username": "john_doe"}
}
// status 401 Unauthorized
Res {
     "error": "Invalid email or password."
}
```

Middlewares {Validation , StrictRateLimiting , logs }

POST [](http://localhost:3000/auth/refresh-token) - Refreshes an expired access token

```json
Req { "refreshToken": "JWT..." }
// status 200 OK
Res {
"token": "New JWT Token...",
"refreshToken": "Old one ..."
}
// status 401 Unauthorized
Res {
     "error": "Invalid refresh token."
}
```

Middlewares { StrictRateLimiting , logs }

POST [](http://localhost:3000/auth/logout) - Logout a user

```json
Req { "Token": "JWT..." }
// status 200 OK
Res {
 "message": "Logged out successfully."
}
// status 401 Unauthorized
Res {
     "error": "Not logged in."
}
```

Middlewares { StrictRateLimiting , logs }

POST [](http://localhost:3000/auth/forgot-password) - Forgot Password

```json
Req { "email": "user@example.com" }
// status 200 OK
Res {
  "message": "Password reset link sent to your email."
}
// status 401 Unauthorized
Res {
     "error": "Invalid Email."
}
```

Middlewares { Validation , StrictRateLimiting , logs }

POST [](http://localhost:3000/auth/reset-password) - Resetting Password

```json
Req { "token": "Token...", "newPassword": "newsecurepassword123" }
// status 200 OK
Res {
  "message": "Password reset successfully."
}
// status 401 Unauthorized
Res {
     "error": "Invalid process."
}
```

Middlewares { Validation , StrictRateLimiting , logs }
