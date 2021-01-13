import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { openDB } from 'idb';
import City from './city/City';
import CityModal from './modal/CityModal';

export default function CityList({ userid }) {
    const [value, setValue] = useState(0);
    const [cities, setCities] = useState([]);

    console.log(userid);

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {cities.map(city => {
                        <Tab label={city.name} />
                    })}
                    <CityModal userid={userid} />
                </Tabs>
            </AppBar>
            {cities.map((city, index) => {
                <TabPanel value={value} index={index}>
                    <City city={city} />
                </TabPanel>
            })}
        </div>
    );
}

CityList.propTypes = {
    userid: PropTypes.any.isRequired
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};