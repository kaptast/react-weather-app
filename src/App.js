import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

import { DBConfig } from './DBConfig';
import { initDB } from 'react-indexed-db';

import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';

initDB(DBConfig);

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return <Dashboard />
}

export default App;
