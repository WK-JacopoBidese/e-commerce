import { useContext, useEffect, useState } from "react";
import ProductList from "../../components/products/ProductList";
import '../../shared/css/PageLayout.css';
import { FiPlus, FiArrowLeft } from "react-icons/fi";
import Menu from "../../components/menu/Menu";
import { Box } from "@mui/material";
import { apiOrders, apiProducts } from "../../shared/constants/Constants";
import { LoginContext, LoginContextValue, User } from "../../components/ContextLayout";
import OrderList from "../../components/orders/OrderList";

export interface OrderLine {
    id?: string,
    riga: number,
    productId: string,
    qta: number,
    price: number,
    totalOrderLine: number
}

export interface Order {
    id?: string,
    userId: User,
    date: Date,
    state: string,
    lines: OrderLine[],
    totalOrder: number
}

export interface OrderResponse {
    totalOrders: number,
    orders: Order[]
}

export default function Ordini() {
    const { token, loggedIn, loggedUser, setToken, setLoggedIn, setLoggedUser } = useContext(LoginContext) as LoginContextValue;
    const [orders, setOrders] = useState<OrderResponse | null>(null);

    useEffect(() => {
        async function fetchData() {
            const request = await fetch(apiOrders, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            const data = await request.json();
            setOrders(data);
        }
        fetchData();
    }, []);

    async function handleDelete(id: string) {
        const canProceed = window.confirm("Sei sicuro di voler procedere?");

        if (!canProceed) return;

        const response = await fetch(apiOrders + "/" + id, {
            headers: {
                "Authorization": "Bearer " + token
            },
            method: "DELETE"
        });

        if (response.status === 204) {
            console.log("Ordine cancellato.");

            if (!orders) return;

            const allOrders = orders?.orders.filter(order => order.id !== id);
            const newOrders = { totalOrders: allOrders?.length, orders: allOrders };
            setOrders(newOrders);
        }
        else {
            console.log("Errore durante la cancellazione del ordine.");
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Menu />
            <OrderList orders={orders?.orders} deleteOrder={handleDelete} />
        </Box>
    );
}