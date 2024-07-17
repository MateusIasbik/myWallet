import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../Utils/db";
import { loginSchema } from "../models/loginSchema";
import { userSchema } from "../models/userSchema";

dotenv.config();

const router = express.Router();

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
            const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET)
            return res.status(200).send({ token });

        } else {
            res.status(401).send("Senha incorreta!");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}



// Rotas para usuários
// router.get("/", userController.getUsers);
// router.get("/:id", userController.getUserById);
// router.post("/", userController.createUser);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

// export default router;
