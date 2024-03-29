import { Route, Routes, Navigate } from "react-router-dom";
import { PossibleRoutes } from "../../core/routing";
import CpuRouter from "./Cpus/CpuRouter";
import CpuCoolerRouter from "./CpuCoolers/CpuCoolerRouter";
import MotherboardRouter from "./Motherboards/MotherboardRouter";
import CaseRouter from "./Cases/CaseRouter";
import RamRouter from "./Ram/RamRouter";
import GpuRouter from "./Gpu/GpuRouter";
import StorageRouter from "./Storage/StorageRouter";
import PsuRouter from "./Psu/PsuRouter";
import Home from "./App/Homepage/Home";
import Sidebar from "./Sidebar/Sidebar";
import Header from "components/Design/Header";
import UserRouter from "./Users/UserRouter";

const CrudRouting = () => {
  return (
    <>
    <Header />
    <div className="app">
      <Sidebar />
      <main className="reset-noise">
      <Routes>
        <Route path={PossibleRoutes.HomeParent} element={<Home/>} />
        <Route index path={PossibleRoutes.CpuParent} element={<CpuRouter/>} />
        <Route path={PossibleRoutes.CpuCoolerParent} element={<CpuCoolerRouter/>} />
        <Route path={PossibleRoutes.MotherboardParent} element={<MotherboardRouter/>} />
        <Route path={PossibleRoutes.StorageParent} element={<StorageRouter/>} />
        <Route path={PossibleRoutes.CaseParent} element={<CaseRouter/>} />
        <Route path={PossibleRoutes.RamParent} element={<RamRouter/>} />
        <Route path={PossibleRoutes.GpuParent} element={<GpuRouter/>} />
        <Route path={PossibleRoutes.PsuParent} element={<PsuRouter/>} />
        <Route path={PossibleRoutes.UserParent} element={<UserRouter/>} />

        <Route
          path="*"
          element={<Navigate to={PossibleRoutes.Cpus} replace />}
        />
      </Routes>
      </main>
    </div>
    </>
  );
};

export default CrudRouting;
