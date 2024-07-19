import { ObjectId } from "mongodb";
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

        const { _id: userId } = req.user;

        const transactions = await db.collection("transactions")
            .find({ userId: new ObjectId(userId) })
            .sort({ _id: -1 })
            .skip(start)
            .limit(limit)
            .toArray();


        res.status(200).send(transactions);

    } catch (err) {
        return res.status(401).send(err.message);
    }
}

export async function editTransactions(req, res) {

    const { id } = req.params;
    const { value, description } = req.body;

    if (!ObjectId.isValid(id)) {
        return res.status(401).send("ID inválido");
    }

    try {
        const result = await db.collection("transactions")
            .updateOne(
                { _id: new ObjectId(id) },
                { $set: { value: value, description: description } }
            );

        if (result.matchedCount === 0) {
            return res.status(404).send("Transação não encontrada!")
        }
        res.sendStatus(204);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteTransactions(req, res) {

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(401).send("ID inválido");
    }

  try {
    const result = await db.collection("transactions")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send("Transação não encontrada");
    }

    res.sendStatus(204);

  } catch (err) {
    return res.status(500).send(err.message);
  }

}