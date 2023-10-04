import { Schema } from "mongoose";
import { IUser, IUserIndirizzoFatt, IUserIndirizzoSped } from "./user.interface";
import {userRoles} from "../enums/user.enums";

const indirizzoSpedSchema = new Schema<IUserIndirizzoSped>({
    via: { type: String, default: null },
    numeroCivico: { type: String, default: null },
    cap: { type: String, default: null },
    citta: { type: String, default: null },
    provincia: { type: String, default: null, minlength: 2, maxlength: 2 },
    nazione: { type: String, default: null, minlength: 2, maxlength: 2 },
    telefono: { type: String, default: null }
});

const indirizzoFattSchema = new Schema<IUserIndirizzoFatt>({
    via: { type: String, default: null },
    numeroCivico: { type: String, default: null },
    cap: { type: String, default: null },
    citta: { type: String, default: null },
    provincia: { type: String, default: null, minlength: 2, maxlength: 2 },
    nazione: { type: String, default: null, minlength: 2, maxlength: 2 }
});

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    nome: { type: String, default: null },
    cognome: { type: String, default: null },
    codiceFiscale: { type: String, default: null, uppercase: true },
    partitaIva: { type: String, default: null, uppercase: true },
    pec: { type: String, default: null, lowercase: true },
    sdi: { type: String, default: null, minlength: 7, maxlength: 7, uppercase: true },
    ruolo: { type: String, default: "user", enum: userRoles },
    indirizzoSped: {type: indirizzoSpedSchema, default: {}},
    indirizzoFatt: {type: indirizzoFattSchema, default: {}}
});

export default userSchema;