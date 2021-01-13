import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Gauge from './Gauge';
import HumidityChart from './HumidityChart';
import { openDB } from 'idb';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

async function deleteCity(cityid) {
    const db = await openDB('weather_db', 1);
    db.delete('cities', cityid)
        .then(console.log)
        .catch(err => {
            console.error(err);
        });
}

const defaultData = {
    main: {
        temp: 0,
        humidity: 0,
        pressure: 0
    },
    wind: {
        speed: 0,
        deg: 0
    }
}

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

export default function City(props) {
    const [currentWeather, setCurrentWeather] = useState(defaultData);

    useEffect(() => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${props.city.cityname}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;
        axios.get(url)
            .then(res => {
                console.log(res);
                setCurrentWeather(res.data);
            })
    }, [props.city.cityname]);

    const handleDeleteClick = event => {
        event.preventDefault();
        deleteCity(props.city.id);
        props.setCitiesCallback(true);
    }

    return (
        <Grid container direction="columns">
            <Grid item container justify="flex-end">
                <Grid item xs={11}>
                <Typography variant="h1">
                    {props.city.cityname}
                </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={handleDeleteClick}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item container direction="row" spacing={2} justify="center">
                <Gauge name={"Temperature"} value={currentWeather.main.temp} unit={"°C"} />
                <Gauge name={"Humidity"} value={currentWeather.main.humidity} unit={"%"} />
                <Gauge name={"Pressure"} value={currentWeather.main.pressure} unit={"hPa"} />
                <Gauge name={"Wind speed"} value={currentWeather.wind.speed} unit={"m/s"} />
                <Gauge name={"Wind direction"} value={degToCompass(currentWeather.wind.deg)} />
            </Grid>
            <Grid 
                container
                item 
                justify="center"
                alignItems="center">
                <HumidityChart cityname={props.city.cityname} />
            </Grid>
        </Grid>
    );

}