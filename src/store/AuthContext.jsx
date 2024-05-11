import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: [],
    islLoggedIn: false,
    login: (token) =>{},
    logout: () =>{}
})

const AuthContextProvider = ({children}) =>{
    const [token, setToken] = useState(null);

    const userLoggedIn = !!token;

    const loginHandler = (token) =>{
        setToken(token);
    }

    const logoutHandler = () =>{
        setToken(null);
    }

    const contextValue = {
        token: token,
        islLoggedIn: userLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }


    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider;