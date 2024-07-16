import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

mongoClient.connect()
    .then(() => {
        db = mongoClient.db();
        console.log("Conectado ao banco de dados");
    })
    .catch(err => console.log(err.message));








const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Rodando na porta ${port}`));