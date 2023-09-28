import { IUser } from "./user.interface";
import { hashPassword } from "../../utils/password";
import { model } from "mongoose";
import userSchema from "./user.schema";

const User = model<IUser>('users', userSchema);

export async function findAll(): Promise<any> {
    try {
        const res = await User.find({});
        return res;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function findOne(id: string): Promise<any> {
    try {
        const res = await User.findById(id).exec();
        return res;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function create(userData: IUser): Promise<any> {
    const hashedPassword = await hashPassword(userData.password);
    const newUser: IUser = {
        username: userData.username,
        email: userData.email,
        password: hashedPassword
    };

    try {
        const res = await User.create(newUser)
        console.log(`Utente salvato con successo!`);
        return res;
    } catch (error) {
        console.log(`Errore durante il salvataggio dell'utente.`);
        throw new Error(`Errore: ${error}`);
    }
}

export async function update(id: string, userData: IUser): Promise<any> {
    if (userData.password) {
        userData.password = await hashPassword(userData.password);
    }

    try {
        await User.updateOne({ _id: id }, userData);
        const updUser = await findOne(id);

        return updUser;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}

export async function remove(id: string): Promise<any> {
    try {
        const res = await User.deleteOne({ _id: id });
        return res;
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}