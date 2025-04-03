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
- **POST** `/users` - Create a new user.
- **GET** `/users/:id` - Get user details by ID.
- **PUT** `/users/:id` - Update user details.
- **DELETE** `/users/:id` - Delete a user.

### Post Endpoints
- **POST** `/posts` - Create a new post.
- **GET** `/posts/:id` - Get post details by ID.
- **PUT** `/posts/:id` - Update a post.
- **DELETE** `/posts/:id` - Delete a post.

### Comment Endpoints
- **POST** `/comments` - Add a comment to a post.
- **GET** `/posts/:id/comments` - Get all comments for a post.
- **DELETE** `/comments/:id` - Delete a comment.

### Authentication Endpoints
- **POST** `/auth/register` - Register a new user.
- **POST** `/auth/login` - Log in and get a JWT token.
- **POST** `/auth/logout` - Log out a user.

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
├── models/            # Mongoose models
├── routes/            # API routes
├── services/          # Business logic
├── util/              # Utility functions
├── app.ts             # Express app setup
├── server.ts          # Server entry point
test/
├── unit/              # Unit tests
├── integration/       # Integration tests
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
- **Email**: mizoahmed017@gmail.com
- **GitHub**: [ahmedmiz](https://github.com/ahmedmiz)