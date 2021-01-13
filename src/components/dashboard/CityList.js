import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import City from './city/City';
import CityModal from './modal/CityModal';

const useStyles = makeStyles((theme) => ({
    tabs: {
      flexGrow: 1,
    }
}));

export default function CityList({ cities, userid, logoutCallback }) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Tabs
                        className={classes.tabs}
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs"
                    >
                        {cities.map(city => (
                            <Tab label={city.cityname} />
                        ))}
                        <CityModal userid={userid} />
                    </Tabs>
                    <IconButton color="inherit" onClick={(e) => logoutCallback()}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {cities.map((city, index) => (
                <TabPanel value={value} index={index}>
                    <City city={city} />
                </TabPanel>
            ))}
        </div>
    );
}

CityList.propTypes = {
    cities: PropTypes.any.isRequired,
    userid: PropTypes.any.isRequired,
    logoutCallback: PropTypes.func.isRequired
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