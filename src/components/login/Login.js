import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

function handleSubmit(event) {
    event.preventDefault();


}

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form onSubmit={handleSubmit}>
                <TextField
                    required
                    id="username"
                    label="Username"
                    defaultValue=""
                    value={username}
                    variant="filled"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    required
                    id="password"
                    label="Password"
                    type="password"
                    defaultValue=""
                    value={password}
                    variant="filled"
                    onChange={(e) => setPassword(e.target.value)}
                />
            <Button type="submit">
                Login
        </Button>
      </form>
    )
}