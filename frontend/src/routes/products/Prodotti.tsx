import { useContext, useEffect, useState } from "react";
import ProductList from "../../components/products/ProductList";
import '../../shared/css/PageLayout.css';
import { FiPlus, FiArrowLeft } from "react-icons/fi";
import Menu from "../../components/menu/Menu";
import { Box } from "@mui/material";
import { apiProducts } from "../../shared/constants/Constants";
import { LoginContext, LoginContextValue } from "../../components/ContextLayout";

export interface Product {
    id?: string,
    code: string,
    description: string,
    um: string,
    price: number,
    discontinued: boolean
}

interface ProductResponse {
    totalProducts: number,
    products: Product[]
}

export default function Prodotti() {
    const { token, loggedIn, loggedUser, setToken, setLoggedIn, setLoggedUser } = useContext(LoginContext) as LoginContextValue;
    const [products, setProducts] = useState<ProductResponse | null>(null);

    useEffect(() => {
        async function fetchData() {
            const request = await fetch(apiProducts, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            const data = await request.json();
            setProducts(data);
        }
        fetchData();
    }, []);

    async function handleDelete(id: string) {
        const canProceed = window.confirm("Sei sicuro di voler procedere?");

        if (!canProceed) return;

        const response = await fetch(apiProducts + "/" + id, {
            headers: {
                "Authorization": "Bearer " + token
            },
            method: "DELETE"
        });

        if (response.status === 204) {
            console.log("Articolo cancellato.");

            if (!products) return;

            const allProducts = products?.products.filter(product => product.id !== id);
            const newProducts = { totalProducts: allProducts?.length, products: allProducts };
            setProducts(newProducts);
        }
        else {
            console.log("Errore durante la cancellazione del articolo.");
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Menu />
            <ProductList products={products?.products} deleteProduct={handleDelete} />
        </Box>
    );
}