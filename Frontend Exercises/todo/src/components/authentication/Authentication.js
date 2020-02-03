import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../context/authentication-context";
// Materil UI
import {
    Paper,
    InputLabel,
    InputAdornment,
    IconButton,
    Button,
    FormControlLabel,
    FormHelperText,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import classes from "./Authentication.module.css";

import StyledTextField from "../styled-mui-components/styled-text-field/StyledTextField";
import StyledCheckbox from "../styled-mui-components/styled-checkbox/StyledCheckbox";
import StyledOutlinedInput from "../styled-mui-components/styled-outlined-input/StyledOutlinedInput";
import StyledFormControl from "../styled-mui-components/styled-form-control/StyledFormControl";


const Authentication = () => {
    const history = useHistory();
    const authenticationContext = useContext(AuthenticationContext);


    const [passwordState, setPasswordState] = useState({
        password: "",
        showPassword: false,
    });

    const [loginState, setLoginState] = useState({
        username: "",
        rememberMe: false,
    });

    const [errorsState, setErrorsState] = useState({
        errors: {
            usernameError: "",
            passwordError: "",
        },
        usernameErrorsFound: false,
        passwordErrorsFound: false,
    });

    const handlePasswordInput = () => event => {
        setPasswordState({ ...passwordState, password: event.target.value });
    };

    const handleUsernameInput = () => event => {
        setLoginState({ ...loginState, username: event.target.value });
    };


    const handleClickShowPassword = () => {
        setPasswordState(prevState => ({ ...passwordState, showPassword: !prevState.showPassword }));
    };

    const handleMouseDownPassword = () => {

    };

    const handleCheckboxClick = () => {
        setLoginState(prevState => ({ ...loginState, rememberMe: !prevState.rememberMe }));
    };

    const loginHandler = () => {
        if (loginState.username === "" && passwordState.password === "") {
            setErrorsState({
                usernameErrorsFound: true,
                passwordErrorsFound: true,
                errors: {
                    usernameError: "Usename cannot be empty.",
                    passwordError: "Password cannot be empty.",
                },
            });
        } else if (loginState.username === "") {
            setErrorsState({
                passwordErrorsFound: false,
                usernameErrorsFound: true,
                errors: {
                    usernameError: "Usename cannot be empty.",
                    passwordError: "",
                },
            });
        } else if (passwordState.password === "") {
            setErrorsState({
                passwordErrorsFound: true,
                usernameErrorsFound: false,
                errors: {
                    usernameError: "",
                    passwordError: "Password cannot be empty.",
                },
            });
        } else {
            setErrorsState({
                passwordErrorsFound: false,
                usernameErrorsFound: false,
                errors: {
                    usernameError: "",
                    passwordError: "",
                },
            });
            authenticationContext.login();
            history.push("/");
        }
    };
    return (
        <Paper elevation={3} className={classes.form}>
            <form autoComplete="off">
                <StyledTextField className={classes.inputs} id="outlined-basic" label="Usename"
                                 error={errorsState.usernameErrorsFound}
                                 variant="outlined"
                                 helperText={errorsState.usernameErrorsFound ? errorsState.errors.usernameError : ""}
                                 onChange={handleUsernameInput()}
                />
                <StyledFormControl variant="outlined" className={classes.inputs}
                                   error={errorsState.passwordErrorsFound}
                >
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <StyledOutlinedInput
                        id="outlined-adornment-password"
                        type={passwordState.showPassword ? "text" : "password"}
                        value={passwordState.password}
                        onChange={handlePasswordInput()}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {passwordState.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                    <FormHelperText id="component-error-text">
                        {errorsState.passwordErrorsFound ? errorsState.errors.passwordError : ""}
                    </FormHelperText>
                </StyledFormControl>
                <Button variant="contained" className={classes.loginBtn} onClick={loginHandler}>
                    Login
                </Button>
                <FormControlLabel
                    className={classes.checkbox}
                    control={
                        <StyledCheckbox
                            checked={loginState.rememberMe}
                            onChange={handleCheckboxClick}
                        />
                    }
                    label="Remember Me"
                />
            </form>
        </Paper>
    );
};

export default Authentication;
