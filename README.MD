# API Project

This project is a RESTful API built with Node.js, Express, and MongoDB. It provides functionality for managing users, posts, comments, and authentication. The API is designed to be modular, scalable, and easy to maintain.

---

## Features

- **User Management**: Create, update, delete, and retrieve user information.
- **Post Management**: Create, update, delete, and retrieve posts.
- **Comment Management**: Add, update, delete, and retrieve comments for posts.
- **Authentication**: Secure user authentication using JWT.
- **Error Handling**: Centralized error handling for consistent API responses.
- **Validation**: Input validation to ensure data integrity.
- **Transactions**: MongoDB transactions for atomic operations.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB to manage schemas and queries.
- **TypeScript**: Strongly typed JavaScript for better maintainability.
- **Mocha & Chai**: Testing framework and assertion library for unit tests.

---

## Installation

1. Clone the repository:

   ```bash
   
   git clone https://github.com/your-username/api-project.git
   cd api-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:

   ```
   
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/api
   JWT_SECRET=your_jwt_secret
   ```

4. Build the project:

   ```bash
   npm run build
   ```

5. Start the server:

   ```bash
   npm start
   ```

---

## API Endpoints

### User Endpoints

- **GET** `/users/:userName` - Retrieve all users with a name prefix.
- **GET** `/users/:userId` - Retrieve a user by their ID.
- **GET** `/users/friends` - Retrieve all friends of the authenticated user.
- **GET** `/users/posts` - Retrieve all posts of the authenticated user.
- **GET** `/users/comments` - Retrieve all comments of the authenticated user.
- **GET** `/users/notifications` - Retrieve all notifications of the authenticated user.
- **PATCH** `/users/userName` - Update the authenticated user's name.
- **DELETE** `/users/` - Delete the authenticated user.

### Feed Endpoints

- **GET** `/feed/` - Retrieve all posts with pagination.
- **GET** `/feed/:postId` - Retrieve a post by its ID.
- **POST** `/feed/` - Create a new post.
- **PATCH** `/feed/:postId` - Update a post's content by its ID.
- **DELETE** `/feed/:postId` - Delete a post by its ID.
- **GET** `/feed/:postId/comments` - Retrieve all comments on a post.
- **POST** `/feed/:postId/comments` - Create a comment on a post.
- **PATCH** `/feed/comments/:commentId` - Update a comment's content by its ID.
- **DELETE** `/feed/comments/:commentId` - Delete a comment by its ID.

### Authentication Endpoints

- **POST** `/auth/register` - Register a new user.
- **POST** `/auth/login` - Log in and get a JWT token.
- **POST** `/auth/logout` - Log out the authenticated user.
- **POST** `/auth/forgotPassword` - Send a forgot password email with an OTP.
- **POST** `/auth/resetPassword` - Reset the user's password.

---

## Testing

Run unit tests using Mocha and Chai:

```bash
npm test
```

---

## Project Structure

```

src/
├── controllers/       # API route controllers
├── data/              # Data access layer
├── middlewares/       # Middleware functions
├── model/             # Mongoose models
├── DB/                # DB connection and Schemas
├── routes/            # API routes
├── services/          # Business logic
├── interfaces/        # interfaces
├── util/              # Utility functions
├── index.ts           # Express app setup
test/
├── unit/              # Unit tests
├── integration/       # Integration tests
server.ts              # Server entry point
```

---

## Error Handling

The API uses centralized error handling to ensure consistent responses. Errors are categorized as:

- **ValidationError**: For invalid input data.
- **NotFoundError**: For missing resources.
- **UnauthorizedError**: For authentication failures.

---

## Contributing

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add feature"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request.

---

## Contact

For questions or feedback, please contact:

- **Name**: Ahmed Saad
- **Email**: <mizoahmed017@gmail.com>
- **GitHub**: [ahmedmiz](https://github.com/ahmedmiz)
