import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const userSent = await db.collection("users").findOne({ email });

        if (userSent) {
            return res.status(409).send("Usuário já existente");
        }
        const passwordEncrypted = bcrypt.hashSync(password, 10);

        const user = {
            name,
            email,
            password: passwordEncrypted
        }

        await db.collection("users").insertOne(user);

        res.status(201).send("Usuário cadastrado com sucesso!");
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ email });

        if (!user) {
            return res.status(404).send("E-mail não encontrado!");
        }

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: 86400 });

            return res.status(200).send({ token });
        } else {
            res.status(401).send("Senha incorreta!");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}
