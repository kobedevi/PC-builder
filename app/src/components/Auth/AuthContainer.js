import { createContext, useContext, useState } from "react";
import App from "../App/App";
// import { Redirect, Route, Switch } from "react-router-dom";
// import { PossibleRoutes } from "../../core/routing";
import LoginPage from "../OnBoarding/Login/LoginPage";
import storage from "../../core/storage";

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
        <App />
      </AuthContext.Provider>
    );
  }

  return <LoginPage setUser={updateUser} />;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };

export default AuthContainer;
