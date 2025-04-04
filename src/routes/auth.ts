import { Router } from "express";
import { addUser, loginUser , logoutUser, forgotPassword , resetPassword} from "../controllers/authControllers";
import isAuth  from "../middlewares/isAuth";
const router = Router();
import { validate } from '../middlewares/validatior';
import {createUserSchema} from "../validators/validationSchemas";

router.post("/register", validate(createUserSchema),addUser);
router.post("/login", loginUser);
router.post("/logout", isAuth ,logoutUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;
