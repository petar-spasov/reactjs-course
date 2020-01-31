import React, {useEffect, useState} from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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

const Forecast = () => {

    const [weatherData, setWeatherData] = useState({
        city: null,
        tempList: null
    });

    const [avgDaily, setAvgDaily] = useState([])

    const groupBy = key => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});

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

            const groupByDate = groupBy('dt');
            let timeConverted = response.data.list.map((item) => {
                let finalDate = new Date(item.dt * 1000);
                return {
                    ...item,
                    dt: finalDate.toLocaleDateString()
                };
            });

            let objectToArray = [];
            let obj = {...groupByDate(timeConverted)};
            objectToArray.push(Object.keys(obj).map(value => {
                return obj[value];
            }));
            let allAverages = [];
            for (let i = 0; i < objectToArray.length; i++) {
                for (let j = 0; j < objectToArray[i].length; j++) {
                    //THree dimensional array
                    let sum = 0;
                    sum += objectToArray[i][j];
                    console.log("Sum", sum);
                    let average = sum / objectToArray[i].length;
                    console.log(objectToArray[i][j]);
                    console.log(average);
                    // allAverages.push({})
                }
            }
            console.log(objectToArray)
        })
    }, []);


    return (
        <div className={classes.forecastWrapper}>
            <StyledCard className={classes.card}>
                <CardContent>
                    <Typography variant="h1" color="textSecondary" gutterBottom>
                        MO
                    </Typography>
                    <Typography variant="body2" component="h2">
                        well meaning and kindly.
                    </Typography>
                </CardContent>
            </StyledCard>
            <StyledCard className={classes.card}>
                <CardContent>
                    <Typography variant="h1" color="textSecondary" gutterBottom>
                        DI
                    </Typography>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br/>
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
            </StyledCard>
            <StyledCard className={classes.card}>
                <CardContent>
                    <Typography variant="h1" color="textSecondary" gutterBottom>
                        MI
                    </Typography>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br/>
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
            </StyledCard>
            <StyledCard className={classes.card}>
                <CardContent>
                    <Typography variant="h1" color="textSecondary" gutterBottom>
                        DO
                    </Typography>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br/>
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
            </StyledCard>
            <StyledCard className={classes.card}>
                <CardContent>
                    <Typography variant="h1" color="textSecondary" gutterBottom>
                        FR
                    </Typography>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br/>
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
            </StyledCard>
        </div>)
};

export default Forecast;