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
import CpuCoolerOverview from "./CpuCoolers/CpuCoolerOverview";
import CreateCpuCooler from "./CpuCoolers/CreateCpuCooler";
import GpuOverview from "./Gpu/GpuOverview";
import CreateGpu from "./Gpu/CreateGpu";

const MainRouting = () => {
  return (
    <Routes>
      <Route
        path={PossibleRoutes.PartsOverview}
        element={<GeneralOverview />}
      />

      <Route path={PossibleRoutes.Cpus} element={<CpuOverview />} />
      <Route path={PossibleRoutes.CpuCreate} element={<CreateCpu />} />

      <Route path={PossibleRoutes.CpuCoolers} element={<CpuCoolerOverview />} />
      <Route
        path={PossibleRoutes.CpuCoolerCreate}
        element={<CreateCpuCooler />}
      />

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

      {/* TODO: Create Components */}
      <Route path={PossibleRoutes.Gpus} element={<GpuOverview />} />
      <Route path={PossibleRoutes.GpuCreate} element={<CreateGpu />} />

      <Route
        path="*"
        element={<Navigate to={PossibleRoutes.PartsOverview} replace />}
      />
    </Routes>
  );
};

export default MainRouting;
