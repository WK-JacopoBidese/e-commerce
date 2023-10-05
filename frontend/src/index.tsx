import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ContextLayout from './components/ContextLayout';
import Prodotto from './routes/products/Prodotto';
import Prodotti from './routes/products/Prodotti';
import CreaProdotto from './routes/products/CreaProdotto';
import SignIn from './components/menu/SignIn';
import Ordini from './routes/orders/Ordini';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "login",
    element: <SignIn />
  },
  // {
  //   path: "ordini/:idOrdine",
  //   element: <Ordine />
  // },
  {
    path: "ordini",
    element: <Ordini />
  },
  // {
  //   path: "ordini/crea",
  //   element: <CreaOrdine />
  // },
  {
    path: "prodotti/:idProdotto",
    element: <Prodotto />
  },
  {
    path: "prodotti",
    element: <Prodotti />
  },
  {
    path: "prodotti/crea",
    element: <CreaProdotto />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextLayout>
      <RouterProvider router={router} />
    </ContextLayout>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
