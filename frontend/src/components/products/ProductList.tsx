import { Product } from "../../routes/products/Prodotti";
import "../../shared/css/GridList.css";
import {FiEye, FiTrash2} from "react-icons/fi";

interface ProductListProps {
    products: Product[] | undefined,
    deleteProduct: Function
}

export default function ProductList(props: ProductListProps) {
    if (!props.products || props.products.length <= 0) {
        return (
            <ul className="gridList">
                <li><span>Nessun articolo trovato</span></li>
            </ul>
        );
    }

    return (
        <ul className="gridList">
            {props.products?.map(
                product => <li key={product.id}>
                    <span>{product.code} - {product.description}</span>
                    <span className="actions">
                        <a href={`/prodotti/${product.id}`} className="action-view"><FiEye />Visualizza</a>
                        <button onClick={() => props.deleteProduct(product.id)} className="action-delete"><FiTrash2 /></button>
                    </span>
                </li>
            )}
        </ul>
    );
}