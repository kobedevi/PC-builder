import { Route, Routes, Navigate } from "react-router-dom";
import { PossibleRoutes } from "../../core/routing";
import GeneralOverview from "./GeneralOverview/GeneralOverview";
import CpuOverview from "./Cpus/CpuOverview";
import CreateCpu from "./Cpus/create/CreateCpu";
import MotherboardOverview from "./Motherboards/MotherboardOverview";
import CreateMotherboard from "./Motherboards/create/CreateMotherboard";
import CaseOverview from "./Cases/CaseOverview";
import CreateCase from "./Cases/create/CreateCase";
import RamOverview from "./Ram/RamOverview";
import CreateRam from "./Ram/create/CreateRam";
import CpuCoolerOverview from "./CpuCoolers/CpuCoolerOverview";
import CreateCpuCooler from "./CpuCoolers/create/CreateCpuCooler";
import GpuOverview from "./Gpu/GpuOverview";
import CreateGpu from "./Gpu/CreateGpu";
import PsuOverview from "./Psu/PsuOverview";
import CreatePsu from "./Psu/CreatePsu";
import CpuDetailContainer from "./Cpus/detail/CpuDetailContainer";
import CpuEdit from "./Cpus/edit/CpuEdit";
import CpuEditContainer from "./Cpus/edit/CpuEditContainer";

const MainRouting = () => {
  return (
    <Routes>
      <Route
        path={PossibleRoutes.PartsOverview}
        element={<GeneralOverview />}
      />

      <Route path={PossibleRoutes.Cpus} element={<CpuOverview />} />
      <Route path={PossibleRoutes.CpuCreate} element={<CreateCpu />} />
      <Route path={PossibleRoutes.CpuDetail} element={<CpuDetailContainer />} />
      <Route path={PossibleRoutes.CpuEdit} element={<CpuEditContainer />} />

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

      <Route path={PossibleRoutes.Gpus} element={<GpuOverview />} />
      <Route path={PossibleRoutes.GpuCreate} element={<CreateGpu />} />

      <Route path={PossibleRoutes.Psus} element={<PsuOverview />} />
      <Route path={PossibleRoutes.PsuCreate} element={<CreatePsu />} />

      <Route
        path="*"
        element={<Navigate to={PossibleRoutes.PartsOverview} replace />}
      />
    </Routes>
  );
};

export default MainRouting;
