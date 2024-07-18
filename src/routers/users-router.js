import { Router } from "express";
import { signIn, signUp } from "../controllers/users-controller.js";
import { validateSchema } from "../middlewares/schema-middleware.js";
import { loginSchema } from "../schemas/loginSchema.js";
import { userSchema } from "../schemas/userSchema.js";
 
const usersRouter = Router();

usersRouter.post("/sign-up", validateSchema(userSchema), signUp);
usersRouter.post("/sign-in", validateSchema(loginSchema), signIn);

export default usersRouter;