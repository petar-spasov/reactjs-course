import React, {useState} from 'react';

export const AuthenticationContext = React.createContext({
    isAuthenticated: false,
    login: () => {}
});

const AuthenticationContextProvider = props => {
    const [isAuthed, setIsAuthed] = useState(false);

    const loginHandler = (username, password) => {
        setIsAuthed(true);
    };

    const logoutHandler = () => {
        setIsAuthed(false);
    };

    return (
        <AuthenticationContext.Provider value={{isAuthenticated: isAuthed, login: loginHandler, logout: logoutHandler}}>
            {props.children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationContextProvider;