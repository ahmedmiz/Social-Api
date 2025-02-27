import { Router } from "express";
import { addUser, loginUser , logoutUser, forgotPassword , resetPassword} from "../controllers/authControllers";
import isAuth  from "../middlewares/isAuth";
const router = Router();

router.post("/register", addUser);
router.post("/login", loginUser);
router.post("/logout", isAuth ,logoutUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;
