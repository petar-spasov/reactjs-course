import React, {useContext} from 'react';
import './App.css';
import {AuthenticationContext} from "./context/authentication-context";
import Authentication from "./components/authentication/Authentication";
import Home from "./components/home/Home";
import { StylesProvider } from "@material-ui/core/styles";
const App = () => {
    const authenticationContext = useContext(AuthenticationContext);

    let view = <Authentication/>;
    if (authenticationContext.isAuthenticated) {
        view = <Home/>;
    }

    return (
        <StylesProvider injectFirst>
            {view}
        </StylesProvider>
    );
};

export default App;
