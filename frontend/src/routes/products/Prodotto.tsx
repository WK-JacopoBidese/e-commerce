import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "./Prodotti";
import '../../shared/css/PageLayout.css';
import { FiArrowLeft } from "react-icons/fi";

export default function Prodotto() {
    const { idProdotto } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        async function fetchData() {
            const request = await fetch("http://localhost:3001/v1/products/" + idProdotto);
            const data = await request.json();
            setProduct(data);
        }
        fetchData();
    }, [idProdotto]);

    return (
        <section>
            {product && (
                <div>
                    <div className="page-title">
                        <h1>{product.code}</h1>
                        <a href="/prodotti"><FiArrowLeft />Torna indietro</a>
                    </div>
                    <p>Descrizione: <b>{product.description}</b></p>
                </div>
            )}
        </section>
    );
}