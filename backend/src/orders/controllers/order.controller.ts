import { Request, Response } from "express";
import * as OrderModel from "../models/order.model";
import { IOrder } from "../models/order.interface";
import { Schema } from "mongoose";

export async function create(req: Request, res: Response) {
    try {
        const newOrder: Schema<IOrder> = await OrderModel.create(req.body);

        return res.status(201).json(newOrder);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante la creazione del ordine." });
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

export async function update(req: Request, res: Response) {
    try {
        const updOrder: Schema<IOrder> = await OrderModel.update(req.params.id, req.body);

        return res.status(201).json(updOrder);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante l'aggiornamento del ordine." });
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