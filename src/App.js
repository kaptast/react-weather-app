import React, { useState,useEffect } from 'react';
import { openDB } from 'idb';
import Cookies from 'universal-cookie';

import logo from './logo.svg';
import './App.css';

import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';

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

function getCookie(cookiename, setCallback) {
  const cookies = new Cookies();

  const cookie = cookies.get(cookiename);
    if (typeof cookie !== 'undefined') {
      setCallback(cookie);
    }
}

function App() {
  DBConfig();

  const [token, setToken] = useState();
  const [userid, setUserId] = useState(0);
  
  const logout = () => {
    setToken();
    const cookies = new Cookies();
    cookies.remove('weather-app-login');
    cookies.remove('weather-app-id');
  }

  useEffect(() => {
    getCookie('weather-app-login', setToken);
    getCookie('weather-app-id', setUserId);
  }, []);

  /*if(!token) {
    return <Login setToken={setToken} setUserIdCallback={setUserId} />
  }*/
  
  return <Dashboard logoutCallback={logout} userid={userid} />
}

export default App;
