import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./Routes/indexRouter.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

// ROTAS AQUI
app.use(route);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Rodando na porta ${port}`));
