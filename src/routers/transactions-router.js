import { Router } from "express";
import { edittransactions, showtransactions, transactions } from "../controllers/transactions-controller.js"
import { validateToken } from "../middlewares/auth-middlewares.js";
import { validateSchema } from "../middlewares/schema-middleware.js";
import { transactionSchema } from "../schemas/transactionSchema.js";
 
const transactionsRouter = Router();

transactionsRouter.use(validateToken);
transactionsRouter.post("/transactions",validateSchema(transactionSchema), transactions);
transactionsRouter.get("/transactions", showtransactions);
transactionsRouter.put("/transactions",validateSchema(transactionSchema), edittransactions);

export default transactionsRouter;