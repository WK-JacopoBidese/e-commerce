import { IOrder } from "./order.interface";
import { model } from "mongoose";
import orderSchema from "./order.schema";

const Order = model<IOrder>('orders', orderSchema);

export async function findAll(): Promise<any> {
    try {
        const res = await Order.find({});
        return res;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function findOne(id: string): Promise<any> {
    try {
        const res = await Order.findById(id).exec();
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
        const res = await Order.create(newOrder)
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

export async function remove(id: string): Promise<any> {
    try {
        const res = await Order.deleteOne({ _id: id });
        return res;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}