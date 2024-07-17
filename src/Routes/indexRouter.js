import { Router } from "express";
import { signIn, signUp } from "../Controllers/user.js";
// import { transactionController } from "../Controllers/transaction";

const route = Router();

route.post("/sign-up", signUp);
route.post("/sign-in", signIn);

// router.use(userController);
// router.use(transactionController);

export default route;