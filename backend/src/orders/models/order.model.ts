import { IOrder, IOrderLine } from "./order.interface";
import { model } from "mongoose";
import { orderSchema, orderLineSchema } from "./order.schema";
import path from "path";

const Order = model<IOrder>('orders', orderSchema);
const OrderLine = model<IOrderLine>('orders.lines', orderLineSchema);

export async function findAll(): Promise<any> {
    try {
        const res = await Order.find({}).populate("userId");
        return res;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function findAllLines(id: string): Promise<any> {
    try {
        const res = await Order.findById(id, 'lines').exec();
        return res?.lines;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function findOne(id: string): Promise<any> {
    try {
        const res = await Order.findById(id).populate("userId").exec();
        return res;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function findOneLine(orderId: string, orderLineId: string): Promise<any> {
    try {
        const res = await Order.find({ "lines._id": orderLineId }).exec();
        console.log(res);
        return res;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function create(orderData: IOrder): Promise<any> {
    const newOrder: IOrder = {
        ...orderData
    };

    try {
        const res = await Order.create(newOrder);
        console.log(`Ordine salvato con successo!`);
        return res;
    } catch (error) {
        console.log(error);
        console.log(`Errore durante il salvataggio del ordine.`);
        throw new Error(`Errore: ${error}`);
    }
}

export async function createLine(id: string, orderData: IOrder): Promise<any> {
    const newOrder: IOrder = {
        ...orderData
    };

    try {
        const res = await Order.create(newOrder);
        console.log(`Ordine salvato con successo!`);
        return res;
    } catch (error) {
        console.log(error);
        console.log(`Errore durante il salvataggio del ordine.`);
        throw new Error(`Errore: ${error}`);
    }
}

export async function update(id: string, orderData: IOrder): Promise<any> {
    try {
        await Order.updateOne({ _id: id }, orderData);
        const updUser = await findOne(id);

        return updUser;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function updateLine(orderId: string, orderLineId: string, orderData: IOrder): Promise<any> {
    try {
        await Order.updateOne({ _id: orderId }, orderData);
        const updUser = await findOne(orderId);

        return updUser;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function remove(id: string): Promise<any> {
    try {
        const res = await Order.deleteOne({ _id: id });
        return res;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function removeLine(orderId: string, orderLineId: string): Promise<any> {
    try {
        const res = await Order.deleteOne({ _id: orderId });
        return res;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}