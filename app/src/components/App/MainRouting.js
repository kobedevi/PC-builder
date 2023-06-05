import { Route, Routes, Navigate } from "react-router-dom";
import { PossibleRoutes } from "../../core/routing";
import GeneralOverview from "./GeneralOverview/GeneralOverview";
// import CpuOverview from "./Cpus/CpuOverview";
// import CreateCpu from "./Cpus/create/CreateCpu";
// import MotherboardOverview from "./Motherboards/MotherboardOverview";
// import MotherboardDetailContainer from "./Motherboards/detail/MotherboardDetailContainer";
// import MotherboardEditContainer from "./Motherboards/edit/MotherboardEditContainer";
// import CreateMotherboard from "./Motherboards/create/CreateMotherboard";
// import CaseOverview from "./Cases/CaseOverview";
// import CreateCase from "./Cases/create/CreateCase";
// import CaseDetailContainer from "./Cases/detail/CaseDetailContainer";
// import CaseEditContainer from "./Cases/edit/CaseEditContainer";
// import RamOverview from "./Ram/RamOverview";
// import CreateRam from "./Ram/create/CreateRam";
// import RamDetailContainer from "./Ram/detail/RamDetailContainer";
// import RamEditContainer from "./Ram/edit/RamEditContainer";
// import CpuCoolerOverview from "./CpuCoolers/CpuCoolerOverview";
// import CreateCpuCooler from "./CpuCoolers/create/CreateCpuCooler";
// import GpuOverview from "./Gpu/GpuOverview";
// import CreateGpu from "./Gpu/create/CreateGpu";
// import PsuOverview from "./Psu/PsuOverview";
// import CreatePsu from "./Psu/create/CreatePsu";
// import CpuDetailContainer from "./Cpus/detail/CpuDetailContainer";
// import CpuEditContainer from "./Cpus/edit/CpuEditContainer";
// import CpuCoolerDetailContainer from "./CpuCoolers/detail/CpuCoolerDetailContainer";
// import CpuCoolerEditContainer from "./CpuCoolers/edit/CpuCoolerEditContainer";
// import GpuDetailContainer from "./Gpu/detail/GpuDetailContainer";
// import GpuPartnerDetailContainer from "./Gpu/detail/GpuPartnerDetailContainer";
// import GpuEditContainer from "./Gpu/edit/GpuEditContainer";
// import GpuPartnerEditContainer from "./Gpu/edit/GpuPartnerEditContainer";
// import PsuDetailContainer from "./Psu/detail/PsuDetailContainer";
// import PsuEditContainer from "./Psu/edit/PsuEditContainer";
import Home from "./Home/Home";
import CpuRouter from "./Cpus/CpuRouter";
import CpuCoolerRouter from "./CpuCoolers/CpuCoolerRouter";
import MotherboardRouter from "./Motherboards/MotherboardRouter";
import CaseRouter from "./Cases/CaseRouter";
import RamRouter from "./Ram/RamRouter";
import GpuRouter from "./Gpu/GpuRouter";
import PsuRouter from "./Psu/PsuRouter";

const MainRouting = () => {
  return (
    <Routes>
      <Route
        path={PossibleRoutes.PartsOverview}
        element={<GeneralOverview />}
      />

      <Route path={PossibleRoutes.HomeParent} element={<Home />} />

      <Route path={PossibleRoutes.CpuParent} element={<CpuRouter/>} />
      <Route path={PossibleRoutes.CpuCoolerParent} element={<CpuCoolerRouter/>} />
      <Route path={PossibleRoutes.MotherboardParent} element={<MotherboardRouter/>} />
      <Route path={PossibleRoutes.CaseParent} element={<CaseRouter/>} />
      <Route path={PossibleRoutes.RamParent} element={<RamRouter/>} />
      <Route path={PossibleRoutes.GpuParent} element={<GpuRouter/>} />
      <Route path={PossibleRoutes.PsuParent} element={<PsuRouter/>} />

      {/* <Route path={PossibleRoutes.Psus} element={<PsuOverview />} />
      <Route path={PossibleRoutes.PsuCreate} element={<CreatePsu />} />
      <Route path={PossibleRoutes.PsuDetail} element={<PsuDetailContainer />} />
      <Route path={PossibleRoutes.PsuEdit} element={<PsuEditContainer/>} /> */}

      <Route
        path="*"
        element={<Navigate to={PossibleRoutes.PartsOverview} replace />}
      />
    </Routes>
  );
};

export default MainRouting;
