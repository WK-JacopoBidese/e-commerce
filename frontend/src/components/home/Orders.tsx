import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useContext, useEffect, useState } from 'react';
import { OrderResponse } from '../../routes/orders/Ordini';
import { apiOrders } from '../../shared/constants/Constants';
import { LoginContext, LoginContextValue } from '../ContextLayout';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
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
    
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>State</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.orders?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{String(row.date)}</TableCell>
              <TableCell>{row.userId.nome} {row.userId.cognome}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell align="right">{`€ ${row.totalOrder}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
