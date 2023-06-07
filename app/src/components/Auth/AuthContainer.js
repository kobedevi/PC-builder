import { createContext, useContext, useState } from "react";
// import { Redirect, Route, Switch } from "react-router-dom";
// import { PossibleRoutes } from "../../core/routing";
import LoginPage from "../OnBoarding/Login/LoginPage";
import storage from "../../core/storage";
import App from "components/App/App/App";
import { Navigate, Route, Routes } from "react-router-dom";
import { PossibleRoutes } from "core/routing";
import Home from "components/App/App/Homepage/Home";
import HomeRouter from "components/App/App/HomeRouter";

const AuthContext = createContext();

const AuthContainer = () => {
  const [user, setUser] = useState(storage.getUser());

  const updateUser = (updatedUser) => {
    storage.storeUser(updatedUser);
    if (updatedUser) {
      storage.storeUserVariableData({
        email: updatedUser.email,
        userName: updatedUser.userName,
      });
    } else {
      storage.storeUserVariableData(null);
    }
    setUser(updatedUser);
  };

  const logout = () => {
    updateUser(null);
  };

  if (user) {
    return (
      <AuthContext.Provider value={{ user, setUser: updateUser, logout }}>
        <App setUser={updateUser}/>
      </AuthContext.Provider>
    );
  }

  // return <LoginPage setUser={updateUser} />;
  // return (
  //   <AuthContext.Provider value={{ user, setUser: updateUser, logout }}>
  //     <App setUser={updateUser}/>
  //   </AuthContext.Provider>
  // );
  return (
    <div className="App reset">
      <div className="content">
        <div className="app scroller">
          <HomeRouter setUser={updateUser}/>
        </div>
      </div>
    </div>
  )
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };

export default AuthContainer;
