import { Router } from "express";
import { addUser, loginUser , logoutUser, forgotPassword , resetPassword} from "../controllers/authControllers";
import isAuth  from "../middlewares/isAuth";
const router = Router();
import { validate } from '../middlewares/validatior';
import { createUserSchema } from "../validators/validationSchemas";

// base URL is /auth

/*
- creates a new user 
- returns a user
- requires name, email, password
- Authentication: No
- Authorization: No
- Method: POST
- URL: /auth/register
- Body: { name: string, email: string, password: string }
- Response: {
  "success": true,
  "message": "posts retrieved successfully.",
  "data": { User : IUser }
}
- Error: 400 Bad Request 
*/
router.post("/register", validate(createUserSchema), addUser);
/*
- logs in a user
- returns a token
- requires email, password
- Authentication: No
- Authorization: No
- Method: POST
- URL: /auth/login
- Body: { email: string, password: string }
- Response: {
  "success": true,
  "message": "log in succeeded.",
  "data": { token : jwt }
}
- Error: 400 Bad Request 
*/
router.post("/login", loginUser);

/*
- logs out a user
- returns 
- requires token
- Authentication: Yes
- Authorization: No
- Method: POST
- URL: /auth/logout
- Body: {}
- Response: {
  "success": true,
  "message": "log out succeeded.",
  "data":
}
- Error: 400 Bad Request 
*/
router.post("/logout", isAuth, logoutUser);
/*
- sends a forgot password email with otp
- returns a token
- requires email
- Authentication: No
- Authorization: No
- Method: POST
- URL: /auth/forgotPassword
- Body: { email: string }
- Response: {
  "success": true,
  "message": "please check your email for OTP.",
  "data": {}
}
- Error: 400 Bad Request 
*/
router.post("/forgotPassword", forgotPassword);

/*
- resets the password
- returns 
- requires email newPassword and otp
- Authentication: No
- Authorization: No
- Method: POST
- URL: /auth/resetPassword
- Body: { email: string , newPassword: string , token: string }
- Response: {
  "success": true,
  "message": "reseting password succeeded.",
  "data": {}
}
- Error: 400 Bad Request 
*/

router.post("/resetPassword", resetPassword);

export default router;
