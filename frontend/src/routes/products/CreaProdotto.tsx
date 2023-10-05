import { FiArrowLeft } from "react-icons/fi";
import CreateProductForm from "../../components/products/CreateProductForm";
import '../../shared/css/PageLayout.css';

export default function CreaProdotto() {
    return (
      <div>
        <div className='page-title'>
          <h1>Aggiungi nuovo articolo</h1>
          <a href="/prodotti"><FiArrowLeft />Torna indietro</a>
        </div>
        <CreateProductForm />
      </div>
    );
  }