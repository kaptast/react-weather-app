import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Container, Grid } from '@material-ui/core';
import CityList from './CityList';

export default function Dashboard({ logoutCallback, userid }) {
    return (
        <>
            <h1>dashboard</h1>
            <Button
                type="submit"
                variant="contained"
                onClick={(e) => logoutCallback()}>
                Logout
                        </Button>
            <CityList userid={userid} />
        </>
    );
}

Dashboard.propTypes = {
    logoutCallback: PropTypes.func.isRequired,
    userid: PropTypes.any.isRequired
}