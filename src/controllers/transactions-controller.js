import { db } from "../config/db.js"
import dotenv from "dotenv";

dotenv.config();

export async function transactions(req, res) {

    const { value, description, type } = req.body;

    try {
        const { userId } = req.user;

        const transaction = {
            userId,
            value,
            description,
            type
        };

        await db.collection("transactions").insertOne(transaction);

        res.status(201).send("Transação criada com sucesso!")

    } catch (err) {
        if (err.name === "JsonWebTokenError") {
            return res.status(401).send("Não autorizado!");
        }
        res.status(500).send(err.message);
    }
}

