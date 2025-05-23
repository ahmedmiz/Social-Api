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
- **Socket.io** :real-time, bidirectional communication between web clients and servers, for chat and live notifications.

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

   ```env

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
---

## Running the Project with Docker

This project includes a Docker container to simplify the process of wrapping and running the application.

### Steps to Run the Project with Docker

1. **Build the Docker Image**:
   Navigate to the root directory of the project and run the following command to build the Docker image:

   ```bash
   docker build -t api-project .
   ```

2. **Run the Docker Container**:
   After building the image, run the container using the following command:

   ```bash
   docker run -p 3000:3000 --env-file .env api-project
   ```

   - The `-p 3000:3000` flag maps port 3000 of the container to port 3000 on your local machine.
   - The `--env-file .env` flag ensures the container uses the environment variables defined in your `.env` file.

3. **Access the API**:
   Once the container is running, you can access the API at:

```
   <http://localhost:3000>
```

4. **Stop the Container**:
   To stop the running container, find its container ID using:

   ```bash
   docker ps
   ```

   Then stop it using:

   ```bash
   docker stop <container-id>
   ```

---

Let me know if you need further assistance!---

## API Endpoints

### User Endpoints

- **GET** `/users` - Search users by name prefix
- **GET** `/users/friends` - Get user's friends list
- **GET** `/users/posts` - Get user's posts
- **GET** `/users/comments` - Get user's comments
- **GET** `/users/notifications` - Get user's notifications
- **PUT** `/users` - Update user's name or email
- **DELETE** `/users` - Delete user account
- **POST** `/users/friends` - Add a friend
- **POST** `/users/profile-picture` - Upload profile picture

### Feed Endpoints

## posts

- **GET** `/feed/posts` - Get paginated feed posts
- **GET** `/feed/posts/:postId` - Get post by ID
- **GET** `/feed/posts/:postId/comments` -
Get post comments by ID
- **POST** `/feed/posts` - Create new post
- **PATCH** `/feed/posts/:postId` - Update post
- **DELETE** `/feed/posts/:postId` - Delete post

## comments

- **POST** `/feed/comments/:postId` - Create new comment
- **POST** `/feed/comments/replies/:commentId` - Create new reply to comment

- **PATCH** `/feed/comments/:commentId` - Update comment
- **DELETE** `/feed/comments/:commentId` - Delete post

### Authentication Endpoints

- **POST** `/auth/register` - Register new user
- **POST** `/auth/login` - User login
- **POST** `/auth/logout` - User logout
- **POST** `/auth/refresh-token` - Refresh access token
- **POST** `/auth/forgot-password` - Request password reset
- **POST** `/auth/reset-password` - Reset password

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
