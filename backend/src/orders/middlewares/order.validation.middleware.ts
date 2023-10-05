import { NextFunction, Request, Response } from "express";
import { findOne } from "../models/order.model";

class OrderValidationMiddleware {
    async orderExists(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const orderExists = await findOne(req.params.id);

        if (!orderExists) {
            return res.status(404).json({ error: `Ordine con ID ${req.params.id} non trovato.` });
        }

        next();
    }

    async orderLineExists(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const orderLineExists = await findOne(req.params.id1);

        if (!orderLineExists) {
            return res.status(404).json({ error: `Ordine con ID ${req.params.id} non trovato.` });
        }

        next();
    }
}

export default new OrderValidationMiddleware();