import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import DBConfig from './DBConfig';

function App() {

  DBConfig();

  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return <Dashboard setToken={setToken} />
}

export default App;
