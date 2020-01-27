import React, {useContext} from "react";
import {AuthenticationContext} from "../../context/authentication-context";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import classes from './Authentication.module.css';
import Button from '@material-ui/core/Button';
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';

const Authentication = props => {

    const ValidationTextField = withStyles({
        root: {
            '& label.Mui-focused' : {
              color:'tomato',
            },
            '& input:valid + fieldset': {
                borderColor: 'tomato',
                borderWidth: 2,
            },
            '& input:invalid + fieldset': {
                borderColor: 'red',
                borderWidth: 2,
            },
            '& input:valid:focus + fieldset': {
                borderColor: 'tomato', // override inline-style
            },
            '& input:valid:hover + fieldset': {
                borderColor: '#ef9a9a'
            }
        },
    })(TextField);

    const authenticationContext = useContext(AuthenticationContext);

    return (
        <Paper elevation={3} className={classes.form}>
            <form autoComplete="off">
                <ValidationTextField className={classes.inputs} id="outlined-basic" label="Username" variant="outlined"/>
                <ValidationTextField className={classes.inputs} id="outlined-basic" label="Password" type="password" variant="outlined"/>
                <Button variant="contained" className={classes.loginBtn}>
                    Primary
                </Button>
            </form>
        </Paper>
    );
};

export default Authentication;