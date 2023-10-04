import { NextFunction, Request, Response } from "express";
import { findOne, findOneEmail } from "../models/user.model";

class UserValidationMiddleware {
    async userExists(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const userExists = await findOne(req.params.id);

        if (!userExists) {
            return res.status(404).json({ error: `Utente con ID ${req.params.id} non trovato.` });
        }

        next();
    }

    async userEmailExists(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { email } = req.body;

        if (!email) {
            next();
            return;
        }

        const userEmailExists = await findOneEmail(email);
        if (userEmailExists) {
            return res.status(400).json({ error: `Utente con e-mail ${email} già presente.` });
        }

        next();
    }
}

export default new UserValidationMiddleware();