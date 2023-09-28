import { Schema } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>({
    code: { type: String, required: true },
    description: { type: String, required: true },
    um: String,
    price: Number,
    discontinued: Boolean
});

export default productSchema;