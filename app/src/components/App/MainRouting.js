import { Route, Routes, Navigate } from "react-router-dom";
import { PossibleRoutes } from "../../core/routing";
import HomeRouter from "./App/HomeRouter";
import CrudRouting from "./CrudRouting";
import LoginPage from "components/OnBoarding/Login/LoginPage";
import Home from "./App/Homepage/Home";

const MainRouting = () => {
  return (
    <Routes>
      <Route index path={PossibleRoutes.Home} element={<Home />} />
      <Route path={PossibleRoutes.CrudParent} element={<CrudRouting />} />
      <Route
        path="*"
        element={<Navigate to={PossibleRoutes.Home} replace />}
      />
    </Routes>
  );
};

export default MainRouting;
