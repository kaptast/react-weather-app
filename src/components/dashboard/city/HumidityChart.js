import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';

export default function HumidityChart(props) {
    const [fiveDayData, setFiveDayData] = useState([]);

    useEffect(() => {
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${props.cityname}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;
        axios.get(url)
            .then(res => {
                const data = res.data.list.map(obj => {
                    let rObj = {};
                    rObj["date"] = obj.dt_txt;
                    rObj["temp"] = obj.main.temp;
                    return rObj;
                });

                setFiveDayData(data);
            })
    }, [props.cityname]);

    return (
        <LineChart width={600} height={300} data={fiveDayData}>
            <Line type="monotone" dataKey="temp" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );
}