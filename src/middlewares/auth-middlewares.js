import { ObjectId } from "mongodb";
import { db } from "../config/db.js";
import jwt from "jsonwebtoken"

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send("Token não fornecido!");
    }

    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) return res.status(401).send("Acesso não autorizado!");

    try {

        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) return res.status(401).send(error);

            const user = await db.collection("users").findOne({
                _id: new ObjectId(decoded.userId)
            });

            if (!user) return res.status(401).send("Acesso não autorizado!");
            
            req.user = user;
            
            next();
        })

    } catch (err) {
        return res.status(500).send(err.message)
    }
}