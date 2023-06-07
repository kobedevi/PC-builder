import { Route, Routes, Navigate } from "react-router-dom";
import { PossibleRoutes } from "../../core/routing";
import GeneralOverview from "./GeneralOverview/GeneralOverview";
import HomeRouter from "./App/HomeRouter";
import CpuRouter from "./Cpus/CpuRouter";
import CpuCoolerRouter from "./CpuCoolers/CpuCoolerRouter";
import MotherboardRouter from "./Motherboards/MotherboardRouter";
import CaseRouter from "./Cases/CaseRouter";
import RamRouter from "./Ram/RamRouter";
import GpuRouter from "./Gpu/GpuRouter";
import PsuRouter from "./Psu/PsuRouter";

const CrudRouting = () => {
  return (
    <Routes>
      <Route index path={PossibleRoutes.CpuParent} element={<CpuRouter/>} />
      <Route path={PossibleRoutes.CpuCoolerParent} element={<CpuCoolerRouter/>} />
      <Route path={PossibleRoutes.MotherboardParent} element={<MotherboardRouter/>} />
      <Route path={PossibleRoutes.CaseParent} element={<CaseRouter/>} />
      <Route path={PossibleRoutes.RamParent} element={<RamRouter/>} />
      <Route path={PossibleRoutes.GpuParent} element={<GpuRouter/>} />
      <Route path={PossibleRoutes.PsuParent} element={<PsuRouter/>} />

      <Route
        path="*"
        element={<Navigate to={PossibleRoutes.Cpus} replace />}
      />
    </Routes>
  );
};

export default CrudRouting;
