import { Router } from "express";
import { signIn, signUp } from "./controllers/users.js";
// import { transactionController } from "../Controllers/transaction";

const router = Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

// router.use(userController);
// router.use(transactionController);

export default router;