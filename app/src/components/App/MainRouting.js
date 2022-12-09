import { Route, Routes, Navigate } from "react-router-dom";
import { PossibleRoutes } from "../../core/routing";
import GeneralOverview from "./GeneralOverview/GeneralOverview";
import CpuOverview from "./Cpus/CpuOverview";
import CreateCpu from "./Cpus/CreateCpu";
import MotherboardOverview from "./Motherboards/MotherboardOverview";
import CreateMotherboard from "./Motherboards/CreateMotherboard";
import CaseOverview from "./Cases/CaseOverview";
import CreateCase from "./Cases/CreateCase";
import RamOverview from "./Ram/RamOverview";
import CreateRam from "./Ram/CreateRam";

const MainRouting = () => {
  return (
    <Routes>
      <Route
        path={PossibleRoutes.PartsOverview}
        element={<GeneralOverview />}
      />

      <Route path={PossibleRoutes.Cpus} element={<CpuOverview />} />
      <Route path={PossibleRoutes.CpuCreate} element={<CreateCpu />} />

      <Route
        path={PossibleRoutes.Motherboards}
        element={<MotherboardOverview />}
      />
      <Route
        path={PossibleRoutes.MotherboardCreate}
        element={<CreateMotherboard />}
      />

      <Route path={PossibleRoutes.Cases} element={<CaseOverview />} />
      <Route path={PossibleRoutes.CaseCreate} element={<CreateCase />} />

      <Route path={PossibleRoutes.Ram} element={<RamOverview />} />
      <Route path={PossibleRoutes.RamCreate} element={<CreateRam />} />

      <Route
        path="*"
        element={<Navigate to={PossibleRoutes.PartsOverview} replace />}
      />
    </Routes>
  );
};

export default MainRouting;
