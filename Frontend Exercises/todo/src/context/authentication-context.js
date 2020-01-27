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

    return (
        <AuthenticationContext.Provider value={{isAuthenticated: isAuthed, login: loginHandler}}>
            {props.children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationContextProvider;