import { Request, Response } from "express";
import { compareHashPassword, hashPassword } from "../../utils/password";
import { findOneEmail } from "../../users/models/user.model";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.JWT_SECRET as string;

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await findOneEmail(email);

    if (!user) {
        return res.status(404).json({ error: `Utente non trovato.` });
    }

    if (!await compareHashPassword(password, user.password)) {
        return res.status(403).json({ error: "Credenziali non corrette" });
    }

    const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, secret, { expiresIn: 1000 * 60 * 60 });

    return res.status(200).json({ token: token });
}