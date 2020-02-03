import React, {useEffect, useState} from "react";
import {Card, CardContent, Typography, TextField, Button} from '@material-ui/core';
import classes from './Forecast.module.css'
import {withStyles} from "@material-ui/core";
import axios from "axios";

const StyledCard = withStyles({
    root: {
        backgroundColor: '#3c414b',
        color: 'white',
        textAlign: 'center',
        '& h1': {
            color: '#9c9c9c',
        }
    }
})(Card);

const StyledTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& label': {
            color: 'white',
        },
        // incase you want different color when not focused
        '& input:valid + fieldset': {
            borderColor: 'white',
            color: 'white'
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
        },
        '& input:valid:focus + fieldset': {
            color: 'white',
            borderColor: 'white', // override inline-style
        },
        '& input:valid:hover + fieldset': {
            borderColor: 'white'
        },
        '& input:focus': {
            color: 'white'
        },
        '& input': {
            color: 'white'
        },
    },
})(TextField);

const Forecast = () => {

    const [weatherData, setWeatherData] = useState({
        city: {},
        tempList: []
    });

    const [inputData, setInputData] = useState("");

    const days = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];


    useEffect(() => {
        axios.get("https://api.openweathermap.org/data/2.5/forecast?q=Munich&units=metric&appid=e0a4f6b1a0cf8f031a408f633fc68d75").then(response => {
            setWeatherData({
                city: response.data.city,
                tempList: response.data.list.map((item) => {
                    return {
                        ...item,
                        dt: new Date(item.dt * 1000)
                    };
                })
            });
        })
    }, []);

    const getConvertedTime = (duration) => {
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        hours = (hours < 10) ? "0" + hours : hours;
        return hours + ":" + minutes;
    };

    const handleCityInput = () => event => {
        setInputData(event.target.value);
    };

    const getTempForCity = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${inputData}&units=metric&appid=e0a4f6b1a0cf8f031a408f633fc68d75`).then(response => {
            setWeatherData({
                city: response.data.city,
                tempList: response.data.list.map((item) => {
                    return {
                        ...item,
                        dt: new Date(item.dt * 1000)
                    };
                })
            });
            console.log(response)
        }).catch(error => {
            console.log(error.response);
            alert("Network error occured: " + error.response.data.message);
        })
    };

    return (
        <React.Fragment>
            <div className={classes.headerWrapper}>
                <p className={classes.location}>{weatherData.city.name + " " + weatherData.city.country}</p>
                <StyledTextField id="filled-basic" label="Input you city" variant="outlined" className={classes.input}
                                 value={inputData} onChange={handleCityInput()}/>
                <Button variant='contained' className={classes.searchBtn} onClick={getTempForCity}>
                    Search city
                </Button>
            </div>
            <div className={classes.forecastWrapper}>
                {weatherData.tempList.map((tempItem) => {
                    return (
                        <StyledCard className={classes.card} key={tempItem.dt}>
                            <CardContent>
                                <Typography variant="h1" gutterBottom>
                                    {days[tempItem.dt.getDay()]}
                                </Typography>
                                <Typography variant="body2" component="h2">
                                    {tempItem.dt.getDate().toString() + "." + (tempItem.dt.getMonth() + 1) + "." + tempItem.dt.getFullYear().toString()}
                                </Typography>
                                <Typography variant="body2" component="h2">
                                    Temperature at: {getConvertedTime(tempItem.dt.getTime())}
                                </Typography>
                                <Typography variant="h2" component="h2">
                                    {tempItem.main.temp}°
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    );
                })
                }
            </div>
        </React.Fragment>)
};

export default Forecast;