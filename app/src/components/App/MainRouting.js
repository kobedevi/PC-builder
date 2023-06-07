import { Route, Routes, Navigate } from "react-router-dom";
import { PossibleRoutes } from "../../core/routing";
import HomeRouter from "./App/HomeRouter";
import CrudRouting from "./CrudRouting";

const MainRouting = () => {
  return (
    <Routes>
      <Route path={PossibleRoutes.CrudParent} element={<CrudRouting />} />
      <Route index path={PossibleRoutes.HomeParent} element={<HomeRouter />} />
    </Routes>
  );
};

export default MainRouting;
