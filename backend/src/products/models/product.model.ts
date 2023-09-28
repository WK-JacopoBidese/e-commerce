import { IProduct } from "./product.interface";
import { model } from "mongoose";
import productSchema from "./product.schema";

const Product = model<IProduct>('products', productSchema);

export async function findAll(): Promise<any> {
    try {
        const res = await Product.find({});
        return res;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function findOne(id: string): Promise<any> {
    try {
        const res = await Product.findById(id).exec();
        return res;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function findOneCode(code: string): Promise<any> {
    try {
        const res = await Product.findOne({code: code}).exec();
        return res;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function create(productData: IProduct): Promise<any> {
    const newUser: IProduct = {
        ...productData
    };

    try {
        const res = await Product.create(newUser)
        console.log(`Prodotto salvato con successo!`);
        return res;
    } catch (error) {
        console.log(`Errore durante il salvataggio del prodotto.`);
        throw new Error(`Errore: ${error}`);
    }
}

export async function update(id: string, productData: IProduct): Promise<any> {
    try {
        await Product.updateOne({ _id: id }, productData);
        const updUser = await findOne(id);

        return updUser;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function remove(id: string): Promise<any> {
    try {
        const res = await Product.deleteOne({ _id: id });
        return res;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}