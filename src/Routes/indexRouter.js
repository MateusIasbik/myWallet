import { Router } from "express";
import { signIn, signUp } from "../Controllers/users.js";
import { transactions } from "../Controllers/transactions.js"
// import { transactionController } from "../Controllers/transaction";

const route = Router();

route.post("/sign-up", signUp);
route.post("/sign-in", signIn);
route.post("/transactions", transactions);
// router.use(userController);
// router.use(transactionController);

export default route;