import "./CreateProductForm.css";

export default function CreateProductForm() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        const newProduct = {
            code: form.code.value,
            description: form.description.value,
            um: form.um.value,
            price: form.price.value,
            discontinued: form.discontinued.value
        };

        newProduct.discontinued = newProduct.discontinued === "on" ? true : false; 

        const response = await fetch("http://localhost:3001/v1/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        const data = await response.json();
        console.log(data);

        if (response.status === 201){
            alert("Articolo creato con successo!");
        }
        else{
            alert("Errore durante la creazione del articolo.");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="code">Codice</label>
            <input type="text" name="code" id="code" />
            <label htmlFor="description">Descrizione</label>
            <input type="text" name="description" id="description" />
            <label htmlFor="um">Unità di misura</label>
            <input type="text" name="um" id="um" placeholder="nr" />
            <label htmlFor="price">Prezzo €</label>
            <input type="number" name="price" id="price" placeholder="0.00" step="0.01" />
            <div className="cnt-checkbox">
                <input type="checkbox" name="discontinued" id="discontinued" />
                <label htmlFor="discontinued">Disattivo</label>
            </div>
            <input type="submit" value="Registra articolo" />
        </form>
    );
}