import { Schema } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>({
    code: { type: String, required: true },
    description: { type: String, required: true },
    sku: String,
    um: {type: String, default: "nr"},
    qta: {type: Number, default: 0},
    price: {type: Number, default: 0},
    discontinued: {type: Boolean, default: false},
    image: String,
    category: {type: String, default: "Varie"},
    availability: {type: Number, default: 0}
});

export default productSchema;