import React, {useContext} from "react";
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import {AuthenticationContext} from "../../context/authentication-context";
import {Link} from 'react-router-dom';
import classes from './NavagationBar.module.css';

const NavigationBar = () => {
    const authenticationContext = useContext(AuthenticationContext);

    return (
        <AppBar position="static" className={classes.navBar}>
            <Toolbar>
                <Typography variant="h6">
                    ToDoiFyLy
                </Typography>
                <Link to={authenticationContext.isAuthenticated ? "/logout" : "/"} className={classes.link}>
                    <Button color="inherit" onClick={authenticationContext.logout}>{authenticationContext.isAuthenticated ? "Logout" : "Login"}</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;