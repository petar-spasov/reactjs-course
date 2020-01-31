import React, {useContext} from 'react';
import './App.css';
import {AuthenticationContext} from "./context/authentication-context";
import Authentication from "./components/authentication/Authentication";
import TodosList from "./components/todos-list/TodosList";
import {StylesProvider} from "@material-ui/core/styles";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavigationBar from "./components/navigation-bar/NavigationBar";

const App = () => {
    const authenticationContext = useContext(AuthenticationContext);

    let view = <Authentication/>;
    if (authenticationContext.isAuthenticated) {
        view = <TodosList/>;
    }

    return (
        <Router>
            <StylesProvider injectFirst>
                <NavigationBar/>
                <Switch>
                    <Route exact path="/">
                        {view}
                    </Route>
                    <Route path="/logout">
                        <Authentication/>
                    </Route>
                </Switch>
            </StylesProvider>
        </Router>
    );
};

export default App;
