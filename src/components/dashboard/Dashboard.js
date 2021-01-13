import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Container, Grid } from '@material-ui/core';
import CityList from './CityList';

export default function Dashboard({ setToken, userid }) {
    return (
        <>
            <h1>dashboard</h1>
            <Button
                type="submit"
                variant="contained"
                onClick={(e) => setToken()}>
                Logout
                        </Button>
            <CityList userid={userid} />
        </>
    );
}

Dashboard.propTypes = {
    setToken: PropTypes.func.isRequired,
    userid: PropTypes.any.isRequired
}