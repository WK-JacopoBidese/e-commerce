import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

class MongoDBValidationMiddleware {
    async isMongoId(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const mongoId = new Types.ObjectId(req.params.id);
            if (!mongoId) {
                return res.status(400).json({ error: `ID ${req.params.id} con formato non valido.` });
            }

            next();
        } catch(error) {
            return res.status(400).json({ error: `ID ${req.params.id} con formato non valido.` });
        }
    }
}

export default new MongoDBValidationMiddleware();