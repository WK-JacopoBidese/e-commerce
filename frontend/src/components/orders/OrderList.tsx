import { Order } from "../../routes/orders/Ordini";
import "../../shared/css/GridList.css";
import {FiEye, FiTrash2} from "react-icons/fi";

interface OrderListProps {
    orders: Order[] | undefined,
    deleteOrder: Function
}

export default function OrderList(props: OrderListProps) {
    if (!props.orders || props.orders.length <= 0) {
        return (
            <ul className="gridList">
                <li key="1"><span>Nessun ordine trovato</span></li>
            </ul>
        );
    }
    
    return (
        <ul className="gridList">
            {props.orders?.map(
                order => <li key={order.id}>
                    <span>{order.userId.nome} {order.userId.cognome}</span>
                    <span>{String(order.date)}</span>
                    <span>{order.state}</span>
                    <span>{order.totalOrder} €</span>
                    <span className="actions">
                        <a href={`/ordini/${order.id}`} className="action-view"><FiEye />Visualizza</a>
                        <button onClick={() => props.deleteOrder(order.id)} className="action-delete"><FiTrash2 /></button>
                    </span>
                </li>
            )}
        </ul>
    );
}