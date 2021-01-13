import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CityList from './CityList';
import { openDB } from 'idb';

export default function Dashboard({ logoutCallback, userid }) {
    const [cities, setCities] = useState([]);

    useEffect(() => {

        openDB('weather_db', 1).then(db => {
            console.log("querying cities");
            console.log(userid);
            db.getAllFromIndex('cities', 'userid', userid)
                .then(userCities => {
                    console.log(userCities);
                    if (Array.isArray(userCities)) {
                        console.log('setting cities');
                        setCities(userCities);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        })

    }, [userid]);

    return (
        <CityList cities={cities} userid={userid} logoutCallback={logoutCallback} />
    );
}

Dashboard.propTypes = {
    logoutCallback: PropTypes.func.isRequired,
    userid: PropTypes.any.isRequired
}