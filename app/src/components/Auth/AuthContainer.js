import { createContext, useContext, useState } from "react";
import storage from "../../core/storage";
import App from "components/App/App/App";
import { useNavigate } from "react-router-dom";
import { PossibleRoutes } from "core/routing";
import HomeRouter from "components/App/App/HomeRouter";

const AuthContext = createContext();

const AuthContainer = () => {
  const navigate = useNavigate();

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
    navigate(PossibleRoutes.Home, { replace: true });
  };

  if (user) {
    return (
      <AuthContext.Provider value={{ user, setUser: updateUser, logout }}>
        <App setUser={updateUser}/>
      </AuthContext.Provider>
    );
  }

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
