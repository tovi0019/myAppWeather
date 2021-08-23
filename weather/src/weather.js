import React, { useState } from 'react';
import { getWeather } from './Api';


const initialState = {
    date: '',
    min: '',
    max: '',
    ready: false,
};

export default function Weather(props) {
    const currentCity=props;
    const [date, setDate] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [ready, setReady] = useState(false);
    function setWeather(currentCity) {
        getWeather(currentCity)
            .then((res) => {
                const date1 = new Date(res.DailyForecasts[0].Date);
                const weather1 = res.DailyForecasts[0].Temperature;
                const min1 = this.celciusConverter(weather.Minimum.Value);
                const max1 = this.celciusConverter(weather.Maximum.Value);
                setDate(`${date1.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} `);
                setMin(min1)
                setMax(max1);
                setReady(true);
            });
    }
    function celciusConverter(degre) {
        const c = (parseInt(degre) - 32) * 5 / 9;
        return c.toFixed();
      }
    return (
        <div className="Content">
            <p className="date">{date}</p>
            <div className="weather">
                <div className="min">
                    <span>MIN</span>
                    <b>{min}°</b>
                </div>
                <div className="max">
                    <span>MAX</span>
                    <b>{max}°</b>
                </div>
            </div>
        </div>
    )
}