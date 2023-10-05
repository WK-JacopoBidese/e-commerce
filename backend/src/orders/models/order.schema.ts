import { Model, Schema, model } from "mongoose";
import { IOrder, IOrderLine, IOrderLineVirtuals, IOrderVirtuals } from "./order.interface";
import userSchema from "../../users/models/user.schema";
import { IUser } from "../../users/models/user.interface";
import productSchema from "../../products/models/product.schema";
import { IProduct } from "../../products/models/product.interface";
import { orderStates } from "../enums/order.enums";

type OrderLineModel = Model<IOrderLine, {}, IOrderLineVirtuals>;
type OrderModel = Model<IOrder, {}, IOrderVirtuals>;

const User = model<IUser>('users', userSchema);
const Product = model<IProduct>('product', productSchema);

export const orderLineSchema = new Schema<IOrderLine, OrderLineModel, IOrderLineVirtuals>({
    riga: { type: Number, default: 1, required: true },
    productId: { type: Schema.Types.ObjectId, ref: Product, required: true },
    qta: { type: Number, default: 1 },
    price: { type: Number, default: 0 }
}, {
    toJSON: { virtuals: true }
});

orderLineSchema.virtual('totalOrderLine').get(function () {
    return this.qta * this.price;
});

export const orderSchema = new Schema<IOrder, OrderModel, IOrderVirtuals>({
    userId: { type: Schema.Types.ObjectId, ref: User, required: true },
    date: Date,
    state: { type: String, default: "created", enum: orderStates },
    lines: [{ type: orderLineSchema, default: {}, required: true }]
}, {
    toJSON: { virtuals: true }
});

orderSchema.virtual('totalOrder').get(function () {
    return this.lines.reduce((accumulator, orderLine) => accumulator + (orderLine.qta * orderLine.price), 0);
});