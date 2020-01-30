import React, {useContext, useState} from 'react';
import {AuthenticationContext} from '../../context/authentication-context';
//Materil UI
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
//End Material UI
import classes from './Authentication.module.css';
import {withStyles} from '@material-ui/core/styles';

/** Styled components should be outside the component so they won't get re-initialized
 * with every component rerender. If they do get re-initialized there is unexpected behaviour with inputs.
 */
const StyledFormControl = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'tomato',
        },

    }
})(FormControl);

const StyledOutlinedInput = withStyles({
    root: {
        '& $notchedOutline': {
            // borderColor: 'tomato'
        },
        '&:hover $notchedOutline': {
            borderColor: '#ef9a9a'
        },
        '&$focused $notchedOutline': {
            borderColor: 'tomato'
        },
    },
    focused: {},
    notchedOutline: {}
})(OutlinedInput);

const StyledCheckbox = withStyles({
    root: {
        color: 'tomato',
        '&$checked': {
            color: 'tomato',
        },
    },
    checked: {},
})(Checkbox);

const StyledTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'tomato',
        },
        //incase you want different color when not focused
        // '& input:valid + fieldset': {
        // borderColor: 'tomato',
        // borderWidth: 2,
        // },
        '& input:invalid + fieldset': {
            borderColor: 'red',
        },
        '& input:valid:focus + fieldset': {
            borderColor: 'tomato', // override inline-style
        },
        '& input:valid:hover + fieldset': {
            borderColor: '#ef9a9a'
        }
    },
})(TextField);

const Authentication = props => {
    const authenticationContext = useContext(AuthenticationContext);


    const [passwordState, setPasswordState] = useState({
        password: '',
        showPassword: false
    });

    const [loginState, setLoginState] = useState({
        username: '',
        rememberMe: false
    });

    const [errorsState, setErrorsState] = useState({
        errors: {
            usernameError: '',
            passwordError: ''
        },
        usernameErrorsFound: false,
        passwordErrorsFound: false
    });

    const handlePasswordInput = () => event => {
        setPasswordState({...passwordState, password: event.target.value})
    };

    const handleUsernameIpput = () => event => {
        setLoginState({...loginState, username: event.target.value})
    };


    const handleClickShowPassword = () => {
        setPasswordState(prevState => ({...passwordState, showPassword: !prevState.showPassword}))
    };

    const handleMouseDownPassword = () => {

    };

    const handleCheckboxClick = () => {
        setLoginState(prevState => ({...loginState, rememberMe: !prevState.rememberMe}))
    };

    const loginHandler = () => {
        if (loginState.username === '' && passwordState.password === '') {
            console.log("Both empty");
            setErrorsState({
                usernameErrorsFound: true,
                passwordErrorsFound: true,
                errors: {
                    usernameError: 'Usename cannot be empty.',
                    passwordError: 'Password cannot be empty.'
                }
            })
        } else if (loginState.username === '') {
            console.log("Username empty");
            setErrorsState({
                passwordErrorsFound: false,
                usernameErrorsFound: true,
                errors: {
                    usernameError: 'Usename cannot be empty.',
                    passwordError: ''
                }
            })
        } else if (passwordState.password === '') {
            console.log("Password empty");
            setErrorsState({
                passwordErrorsFound: true,
                usernameErrorsFound: false,
                errors: {
                    usernameError: '',
                    passwordError: 'Password cannot be empty.'
                }
            })
        } else {
            setErrorsState({
                passwordErrorsFound: false,
                usernameErrorsFound: false,
                errors: {
                    usernameError: '',
                    passwordError: ''
                }
            });
            authenticationContext.login();
        }
    };
    return (
        <Paper elevation={3} className={classes.form}>
            <form autoComplete='off'>
                <StyledTextField className={classes.inputs} id='outlined-basic' label='Username'
                                 error={errorsState.usernameErrorsFound}
                                 variant='outlined'
                                 helperText={errorsState.usernameErrorsFound ? errorsState.errors.usernameError : ''}
                                 onChange={handleUsernameIpput()}/>
                <StyledFormControl variant='outlined' className={classes.inputs}
                                   error={errorsState.passwordErrorsFound}>
                    <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                    <StyledOutlinedInput
                        id='outlined-adornment-password'
                        type={passwordState.showPassword ? 'text' : 'password'}
                        value={passwordState.password}
                        onChange={handlePasswordInput()}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge='end'
                                >
                                    {passwordState.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                    <FormHelperText
                        id="component-error-text">{errorsState.passwordErrorsFound ? errorsState.errors.passwordError : ''}</FormHelperText>
                </StyledFormControl>
                <Button variant='contained' className={classes.loginBtn} onClick={loginHandler}>
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
                    label='Remember Me'
                />
            </form>
        </Paper>
    );
};

export default Authentication;