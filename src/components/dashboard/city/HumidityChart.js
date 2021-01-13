import React, { useState, useEffect } from 'react';
import { LineChart, Line } from 'recharts';
import axios from 'axios';

const testdata = [{name: 'Page A', value: 400, pv: 2400, amt: 2400}];

export default function HumidityChart(props) {
    const [fiveDayData, setFiveDayData] = useState([]);

    useEffect(() => {
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${props.cityname}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;
        axios.get(url)
            .then(res => {
                console.log(res);
                const data = new Map(res.data.list.map(i => [i.dt, i.main.temp]));
                //const data = res.data.list.map(i => [i.dt, i.main.temp]);
                //const data = .map(x => x.main.temp);
                console.log(data);
                console.log(testdata);
                //console.log(data.entries);
                //console.log(Object.fromEntries(data));

                setFiveDayData(data);
            })
    }, [props.cityname]);

    return (
        <LineChart width={400} height={400} data={testdata}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
    );
}