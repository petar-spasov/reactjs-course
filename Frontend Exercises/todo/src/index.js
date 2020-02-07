import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthenticationContextProvider from "./context/authentication-context";


ReactDOM.render(
    <AuthenticationContextProvider>
        <App/>
    </AuthenticationContextProvider>, document.getElementById('root'));
