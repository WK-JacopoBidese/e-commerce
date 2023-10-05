import { Request, Response } from "express";
import * as OrderModel from "../models/order.model";
import { IOrder, IOrderLine } from "../models/order.interface";
import { Schema } from "mongoose";

export async function create(req: Request, res: Response) {
    try {
        const newOrder: Schema<IOrder> = await OrderModel.create(req.body);

        return res.status(201).json(newOrder);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante la creazione del ordine." });
    }
}

export async function createLine(req: Request, res: Response) {
    try {
        const newOrderLine: Schema<IOrderLine> = await OrderModel.createLine(req.params.id, req.body);

        return res.status(201).json(newOrderLine);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante l'aggiunta di una riga ordine." });
    }
}

export async function findAll(req: Request, res: Response) {
    try {
        const allOrders: Schema<IOrder>[] = await OrderModel.findAll();

        return res.status(200).json({ totalOrders: allOrders.length, orders: allOrders });
    } catch (error) {
        return res.status(500).json({ error: "Errore durante il recupero degli ordini." });
    }
}

export async function findAllLines(req: Request, res: Response) {
    try {
        const allOrderLines: Schema<IOrderLine>[] = await OrderModel.findAllLines(req.params.id);

        return res.status(200).json({ totalLines: allOrderLines.length, lines: allOrderLines });
    } catch (error) {
        return res.status(500).json({ error: "Errore durante il recupero delle righe ordini." });
    }
}

export async function findOne(req: Request, res: Response) {
    try {
        const order: Schema<IOrder> = await OrderModel.findOne(req.params.id);

        if (!order) {
            return res.status(404).json({ error: "Ordine non trovato." });
        }

        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante il recupero del singolo ordine." });
    }
}

export async function findOneLine(req: Request, res: Response) {
    try {
        const orderLine: Schema<IOrderLine> = await OrderModel.findOneLine(req.params.orderId, req.params.orderLineId);

        if (!orderLine) {
            return res.status(404).json({ error: "Riga ordine non trovata." });
        }

        return res.status(200).json(orderLine);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante il recupero della singola riga ordine." });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const updOrder: Schema<IOrder> = await OrderModel.update(req.params.id, req.body);

        return res.status(201).json(updOrder);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante l'aggiornamento del ordine." });
    }
}

export async function updateLine(req: Request, res: Response) {
    try {
        const updOrderLine: Schema<IOrderLine> = await OrderModel.updateLine(req.params.id, req.params.id1, req.body);

        return res.status(201).json(updOrderLine);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante l'aggiornamento della riga ordine." });
    }
}

export async function remove(req: Request, res: Response) {
    try {
        await OrderModel.remove(req.params.id);

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: "Errore durante la cancellazione del ordine." });
    }
}

export async function removeLine(req: Request, res: Response) {
    try {
        await OrderModel.removeLine(req.params.id, req.params.id1);

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: "Errore durante la cancellazione della riga ordine." });
    }
}