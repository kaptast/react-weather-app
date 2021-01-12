import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Container, Grid } from '@material-ui/core';

export default function Dashboard({ setToken }) {
    return (
        <>
            <h1>dashboard</h1>
            <Button
                type="submit"
                variant="contained"
                onClick={(e) => setToken()}>
                Logout
                        </Button>
        </>
    );
}

Dashboard.propTypes = {
    setToken: PropTypes.func.isRequired
}