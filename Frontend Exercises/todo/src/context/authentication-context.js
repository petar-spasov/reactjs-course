import React, { useState } from 'react';
import PropTypes from 'prop-types';
export const AuthenticationContext = React.createContext({
    isAuthenticated: false,
    login: () => {
    },
});

const AuthenticationContextProvider = props => {
    const [isAuthed, setIsAuthed] = useState(false);

    const loginHandler = () => {
        setIsAuthed(true);
    };

    const logoutHandler = () => {
        setIsAuthed(false);
    };

    return (
        <AuthenticationContext.Provider
            value={{ isAuthenticated: isAuthed, login: loginHandler, logout: logoutHandler }}
        >
            {props.children}
        </AuthenticationContext.Provider>
    );
};

AuthenticationContextProvider.propTypes = {
    children: PropTypes.object.isRequired,
};

export default AuthenticationContextProvider;
