import { Route, Routes, Navigate } from "react-router-dom";
import { PossibleRoutes } from "../../core/routing";
import GeneralOverview from "./GeneralOverview/GeneralOverview";
import CaseOverview from "./Cases/CaseOverview";
import CreateCase from "./Cases/CreateCase";
import CpuOverview from "./Cpus/CpuOverview";
import CreateCpu from "./Cpus/CreateCpu";
import CreateMotherboard from "./Motherboards/CreateMotherboard";
import MotherboardOverview from "./Motherboards/MotherboardOverview";

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

      <Route
        path="*"
        element={<Navigate to={PossibleRoutes.PartsOverview} replace />}
      />
    </Routes>
  );
};

export default MainRouting;
