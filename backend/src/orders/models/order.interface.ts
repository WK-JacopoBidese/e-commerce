import { ObjectId } from "mongoose";

export interface IOrderLine {
    riga: number,
    productId: ObjectId,
    qta: number,
    price: number
}

export interface IOrderLineVirtuals {
    totalOrderLine: number
}

export interface IOrder {
    userId: ObjectId,
    date: Date,
    state: string,
    lines: IOrderLine[]
}

export interface IOrderVirtuals {
    totalOrder: number
}