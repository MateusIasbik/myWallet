import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routers/users-router.js";
import transactionsRouter from "./routers/transactions-router.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

// ROTAS AQUI
app.use(usersRouter);
app.use(transactionsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Rodando na porta ${port}`));
