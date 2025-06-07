import { Router } from "express";
import { signUpSchema, loginSchema } from "../validations/authValidation";
import { validateBody } from "../middlewares/validator";
import { AuthController } from "../controllers/authController";
const router = Router();

router.post("/signup", validateBody(signUpSchema), AuthController.signUp);
router.post("/login", validateBody(loginSchema), AuthController.login);

export default router;
