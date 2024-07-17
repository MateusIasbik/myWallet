import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../Utils/db.js";
import { loginSchema } from "../Models/loginSchema.js";
import { userSchema } from "../Models/userSchema.js";

dotenv.config();


export async function signUp(req, res) {
    const { name, email, password } = req.body;

    const validate = userSchema.validate(req.body, { abortEarly: false });

    if (validate.error) {
        const errors = validate.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

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

    const validate = loginSchema.validate(req.body, { abortEarly: false });

    if (validate.error) {
        const errors = validate.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const user = await db.collection("users").findOne({ email });

        if (!user) {
            return res.status(404).send("E-mail não encontrado!");
        }

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Corrigi o id do usuário
            return res.status(200).send({ token });
        } else {
            res.status(401).send("Senha incorreta!");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}
