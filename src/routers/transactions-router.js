import { Router } from "express";
import { deleteTransactions, editTransactions, showtransactions, transactions } from "../controllers/transactions-controller.js"
import { validateToken } from "../middlewares/auth-middlewares.js";
import { validateSchema } from "../middlewares/schema-middleware.js";
import { transactionSchema } from "../schemas/transactionSchema.js";
import { editSchema } from "../schemas/editSchema.js";
 
const transactionsRouter = Router();

transactionsRouter.use(validateToken);
transactionsRouter.post("/transactions",validateSchema(transactionSchema), transactions);
transactionsRouter.get("/transactions", showtransactions);
transactionsRouter.put("/transactions/:id", validateSchema(editSchema), editTransactions);
transactionsRouter.delete("/transactions/:id", deleteTransactions);

export default transactionsRouter;