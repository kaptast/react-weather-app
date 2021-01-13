import React, { useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { openDB } from 'idb';


async function addCity(userid, cityname, handleClose, setCitiesCallback) {
    const db = await openDB('weather_db', 1);
    db.add('cities', { cityname: cityname, userid: userid })
        .then(cityid => {
            console.log('city added');
            console.log(cityid);

            setCitiesCallback(true);
            handleClose();
        }).catch(err => {
            console.error(err);
        });
}

export default function CityModalFrom({ userid, handleClose, setCitiesCallback }) {
    const [cityName, setCityName] = useState();

    const handleSubmit = event => {
        event.preventDefault();

        addCity(userid, cityName, handleClose, setCitiesCallback);
    }

    return (
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
                        id="cityname"
                        label="City name"
                        defaultValue=""
                        value={cityName}
                        variant="filled"
                        onChange={(e) => setCityName(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button
                        type="submit"
                        variant="contained">
                        Add City
                        </Button>
                </Grid>
            </Grid>
        </form>
    );
}