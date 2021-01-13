import React from 'react';
import PropTypes from 'prop-types';
import CityList from './CityList';

export default function Dashboard({ logoutCallback, userid }) {
    return (
        <CityList cities={cities} userid={userid} logoutCallback={logoutCallback} />
    );
}

Dashboard.propTypes = {
    logoutCallback: PropTypes.func.isRequired,
    userid: PropTypes.any.isRequired
}