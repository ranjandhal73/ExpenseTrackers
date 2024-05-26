// import { createContext, useState } from "react";

// export const AuthContext = createContext({
//     token: [],
//     islLoggedIn: false,
//     login: (token) =>{},
//     logout: () =>{}
// })

// const AuthContextProvider = ({children}) =>{
//     const initialToken = localStorage.getItem('token')
//     const [token, setToken] = useState(initialToken);

//     const userLoggedIn = !!token;

//     const loginHandler = (token) =>{
//         setToken(token);
//         localStorage.setItem('token', token)
//     }

//     const logoutHandler = () =>{
//         setToken(null);
//         localStorage.removeItem('token')
//     }

//     const contextValue = {
//         token: token,
//         islLoggedIn: userLoggedIn,
//         login: loginHandler,
//         logout: logoutHandler
//     }


//     return <AuthContext.Provider value={contextValue}>
//         {children}
//     </AuthContext.Provider>
// }

// export default AuthContextProvider;