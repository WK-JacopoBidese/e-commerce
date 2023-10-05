import React, { Dispatch, createContext, useContext, useState } from 'react';
import Dashboard from './components/home/Dashboard';
import Menu from './components/menu/Menu';
import { Box } from '@mui/material';
import { LoginContext, LoginContextValue } from './components/ContextLayout';
import "./shared/css/GridList.css";

function App() {
  const { token, loggedIn, loggedUser, setToken, setLoggedIn, setLoggedUser } = useContext(LoginContext) as LoginContextValue;
  
  return (
    <Box sx={{ display: 'flex' }}>
      <Menu />
      { loggedIn ? <Dashboard /> : <div className='gridList'></div> }
    </Box>
  );
}

export default App;