import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { openDB } from 'idb';
import Cookies from 'universal-cookie';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

function setToken(userid, setTokenCallback) {
    const cookies = new Cookies();
    const token = getToken();
    console.log(token);
    cookies.set('weather-app-login', token);
    cookies.set('weather-app-id', userid);
    setTokenCallback(token);
}

async function doDatabaseStuff(loginName, pwd, setTokenCallback) {
    const hashedPassword = await hashPassword(pwd);

    const db = await openDB('weather_db', 1);
    await db.getFromIndex('users', 'username', loginName)
        .then(user => {
            if (typeof user === 'undefined') {
                console.log('user not found');
                db.add('users', { username: loginName, password: hashedPassword })
                    .then(userid => {
                        setToken(userid, setTokenCallback);
                    }).catch(err => {
                        console.error(err);
                    });

            } else {
                console.log("user found");
                if (user.password === hashedPassword) {
                    console.log('login successful!');
                    console.log(user);
                    setToken(user.id, setTokenCallback);
                } else {
                    console.error('incorrect password')
                    return '';
                }
            }
        })
        .catch(err => {
            console.error(err);
        });
}

async function handleLogin(username, password, setTokenCallback, setUserIdCallback) {
    doDatabaseStuff(username, password, setTokenCallback, setUserIdCallback);
}

async function hashPassword(password) {
    return await sha256(password);
}

function getToken() {
    return makeid(30);
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

export default function Login({ setToken, setUserIdCallback }) {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        handleLogin(username, password, setToken, setUserIdCallback);
    }

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <TextField
                            required
                            id="username"
                            label="Username"
                            defaultValue=""
                            value={username}
                            variant="filled"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="password"
                            label="Password"
                            type="password"
                            defaultValue=""
                            value={password}
                            variant="filled"
                            onChange={(e) => setPassword(e.target.value)}
                        /></Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            variant="contained">
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUserIdCallback: PropTypes.func.isRequired
}