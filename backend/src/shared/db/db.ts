import { connect } from 'mongoose';
import * as dotenv from "dotenv";

dotenv.config();

const host = process.env.CONNECTION_STRING || "";
const dbname = process.env.DB_NAME || "";

export async function connectDb(): Promise<void> {
    try {
        await connect(host + dbname);
        console.log('Connected successfully to MongoDB');
    } catch (error) {
        throw new Error(`Errore: ${error}`);
    }
}