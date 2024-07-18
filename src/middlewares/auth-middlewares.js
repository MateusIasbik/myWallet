import { db } from "../config/db.js";
import jwt from "jsonwebtoken"

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) return res.status(401).send("Acesso não autorizado!");

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.status(401).send("Acesso não autorizado!")

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(500).send(err.message)
    }
}