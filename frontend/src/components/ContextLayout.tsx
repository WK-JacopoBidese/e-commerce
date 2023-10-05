import { Dispatch, createContext, useState } from "react";

interface UserIndirizzoSped {
    via: string,
    numeroCivico: string,
    cap: string,
    citta: string,
    provincia: string,
    nazione: string,
    telefono: string
}

interface UserIndirizzoFatt {
    via: string,
    numeroCivico: string,
    cap: string,
    citta: string,
    provincia: string,
    nazione: string
}

export interface User {
    id?: string,
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
    indirizzoSped: UserIndirizzoSped,
    indirizzoFatt: UserIndirizzoFatt
}

export interface LoginContextValue {
    token: string,
    loggedIn: boolean,
    loggedUser: User,
    setToken: Dispatch<React.SetStateAction<string>>,
    setLoggedIn: Dispatch<React.SetStateAction<boolean>>,
    setLoggedUser: Dispatch<React.SetStateAction<User>>
}

export const LoginContext = createContext<LoginContextValue | null>(null);

export default function ContextLayout(props: any) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [loggedUser, setLoggedUser] = useState({} as User);

    return (
        <LoginContext.Provider value={{ token, loggedIn, loggedUser, setToken, setLoggedIn, setLoggedUser }}>
            <main id="contenuto" className="main">
                {props.children}
            </main>
        </LoginContext.Provider>
    )
}