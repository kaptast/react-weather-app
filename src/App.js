import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import { openDB } from 'idb';

function DBConfig() {
  openDB('weather_db', 1, {
      upgrade(db) {
        var userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true});
        userStore.createIndex('username', 'username', {unique: true});

        var citiesStore = db.createObjectStore('cities', { keyPath: 'id', autoIncrement: true});
        citiesStore.createIndex('userid', 'userid');
      }
  })
}

function App() {
  DBConfig();

  const [token, setToken] = useState();
  const [userid, setUserId] = useState(0);

  if(!token) {
    return <Login setToken={setToken} setUserIdCallback={setUserId} />
  }
  if (token && userid !== 0) {
    return <Dashboard setToken={setToken} userid={userid} />
  }
  return (<> </>);
}

export default App;
