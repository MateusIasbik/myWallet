import jwt from "jsonwebtoken";
import { db } from "../Utils/db.js"
import { transactionSchema } from "../Models/transactionSchema.js"
import dotenv from "dotenv";

dotenv.config();

export async function transactions(req, res) {

    const { value, description, type } = req.body;
    const { authorization } = req.headers;

    console.log("Token:", token);

    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) return res.status(401).send("Acesso não autorizado!");

    // TERMINAR A AUTORIZAÇÂO

    console.log("Token:", token);


    try {

        //JWT verificação do token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded Token:", decoded);


        const { userId } = decoded;

        if (!userId) return res.status(401).send("Token inválido!");

        const validate = transactionSchema.validate(req.body, { abortEarly: false });

        if (validate.error) {
            const errors = validate.error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }

        const transaction = {
            userId,
            value,
            description,
            type
        };

        await db.collection("transactions").insertOne(transaction);

        res.status(201).send("Transação criada com sucesso!")

    } catch (err) {

        console.log("Error:", err);

        
        if (err.name === "JsonWebTokenError") {
            return res.status(401).send("Não autorizado!");
        }
        res.status(500).send(err.message);
    }
}

// router.get("/", transactionController.getTransactions);
// router.get("/:id", transactionController.getTransactionById);
// router.post("/", transactionController.createTransaction);
// router.put("/:id", transactionController.updateTransaction);
// router.delete("/:id", transactionController.deleteTransaction);