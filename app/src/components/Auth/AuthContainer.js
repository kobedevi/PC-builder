import { createContext, useContext, useState } from "react";
import App from '../App/App';
// import { Redirect, Route, Switch } from 'react-router-dom';
// import { Routes } from "../../core/routing";
// import SplashPage from "../OnBoarding/Login/splash";
// import LoginPage from "../OnBoarding/Login/LoginPage";
// import storage from "../../core/storage";
// import Map from '../App/Map/Map';


const AuthContext = createContext();

const AuthContainer = () => {
    // const [user, setUser] = useState(storage.getUser());

    // const updateUser = (updatedUser) => {
    //     storage.storeUser(updatedUser);
    //     if(updatedUser) {
    //         storage.storeUserVariableData({'email': updatedUser.email, 'userName': updatedUser.userName});
    //     } else {
    //         storage.storeUserVariableData(null);
    //     }
    //     setUser(updatedUser);
    // }

    // const logout = () => {
    //     updateUser(null);
    // }

    // if(user) {
    //     return (
    //         <AuthContext.Provider value={{user, setUser: updateUser, logout}}>
    //             <App/>
    //         </AuthContext.Provider>
    //     )
    // }

    return (
        <App/>
    )
}

const useAuth = () => {
    return useContext(AuthContext);
}

export {
    useAuth,
}

export default AuthContainer;