import { db } from "../config/db.js"
import dotenv from "dotenv";

dotenv.config();

export async function transactions(req, res) {

    const { value, description, type } = req.body;

    try {
        const { _id: userId } = req.user;

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

export async function showtransactions(req, res) {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    if (page <= 0) {
        return res.status(400).send("O valor da página deve ser positivo!")
    }

    const start = (page - 1) * limit;
    
    try {
        const transactions = await db.collection("transactions")
        .find()
        .skip(start)
        .limit(limit)
        .toArray();
        
        transactions.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());

        res.status(200).send(transactions);

    } catch (err) {
        return res.status(401).send(err.message);
    }
}

export async function edittransactions(req, res) {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    if (page <= 0) {
        return res.status(400).send("O valor da página deve ser positivo!")
    }

    const start = (page - 1) * limit;
    
    try {
        const transactions = await db.collection("transactions")
        .find()
        .skip(start)
        .limit(limit)
        .toArray();
        
        transactions.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());

        res.status(200).send(transactions);

    } catch (err) {
        return res.status(401).send(err.message);
    }
}