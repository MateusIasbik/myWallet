import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/indexRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ROTAS AQUI
app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Rodando na porta ${port}`));