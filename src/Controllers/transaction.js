import express from "express";
import transactionSchema from "../Models/transactionSchema.js"

const router = express.Router();

// Rotas para transações
router.get("/", transactionController.getTransactions);
router.get("/:id", transactionController.getTransactionById);
router.post("/", transactionController.createTransaction);
router.put("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);

export default router;