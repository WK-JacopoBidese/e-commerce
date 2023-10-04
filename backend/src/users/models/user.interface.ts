export interface IUserIndirizzoSped {
    via: string,
    numeroCivico: string,
    cap: string,
    citta: string,
    provincia: string,
    nazione: string,
    telefono: string
}

export interface IUserIndirizzoFatt {
    via: string,
    numeroCivico: string,
    cap: string,
    citta: string,
    provincia: string,
    nazione: string
}

export interface IUser {
    username: string,
    email: string,
    password: string,
    nome: string,
    cognome: string,
    codiceFiscale: string,
    partitaIva: string,
    pec: string,
    sdi: string,
    ruolo: string,
    indirizzoSped: IUserIndirizzoSped,
    indirizzoFatt: IUserIndirizzoFatt
}