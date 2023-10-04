import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.JWT_SECRET as string;

class AuthMiddleware {
    verifyToken(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];

            if (!token) {
                return res.status(401).json({ error: "Token non valido" });
            }

            const decodedToken = jwt.verify(token, secret);

            if (!decodedToken) {
                return res.status(401).json({ error: "Token non valido" });
            }
        }
        catch (error) {
            return res.status(400).json({ error: error });
        }

        next();
    }
}

export default new AuthMiddleware;