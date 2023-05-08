import { Route, Routes, Navigate } from "react-router-dom";
import { PossibleRoutes } from "../../core/routing";
import GeneralOverview from "./GeneralOverview/GeneralOverview";
import CpuOverview from "./Cpus/CpuOverview";
import CreateCpu from "./Cpus/create/CreateCpu";
import MotherboardOverview from "./Motherboards/MotherboardOverview";
import MotherboardDetailContainer from "./Motherboards/detail/MotherboardDetailContainer";
import MotherboardEditContainer from "./Motherboards/edit/MotherboardEditContainer";
import CreateMotherboard from "./Motherboards/create/CreateMotherboard";
import CaseOverview from "./Cases/CaseOverview";
import CreateCase from "./Cases/create/CreateCase";
import CaseDetailContainer from "./Cases/detail/CaseDetailContainer";
import CaseEditContainer from "./Cases/edit/CaseEditContainer";
import RamOverview from "./Ram/RamOverview";
import CreateRam from "./Ram/create/CreateRam";
import RamDetailContainer from "./Ram/detail/RamDetailContainer";
import RamEditContainer from "./Ram/edit/RamEditContainer";
import CpuCoolerOverview from "./CpuCoolers/CpuCoolerOverview";
import CreateCpuCooler from "./CpuCoolers/create/CreateCpuCooler";
import GpuOverview from "./Gpu/GpuOverview";
import CreateGpu from "./Gpu/create/CreateGpu";
import PsuOverview from "./Psu/PsuOverview";
import CreatePsu from "./Psu/create/CreatePsu";
import CpuDetailContainer from "./Cpus/detail/CpuDetailContainer";
import CpuEditContainer from "./Cpus/edit/CpuEditContainer";
import CpuCoolerDetailContainer from "./CpuCoolers/detail/CpuCoolerDetailContainer";
import CpuCoolerEditContainer from "./CpuCoolers/edit/CpuCoolerEditContainer";
import GpuDetailContainer from "./Gpu/detail/GpuDetailContainer";
import GpuPartnerDetailContainer from "./Gpu/detail/GpuPartnerDetailContainer copy";

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
        path={PossibleRoutes.CpuCoolerDetail}
        element={<CpuCoolerDetailContainer />}
      />
      <Route
        path={PossibleRoutes.CpuCoolerEdit}
        element={<CpuCoolerEditContainer />}
      />

      <Route
        path={PossibleRoutes.Motherboards}
        element={<MotherboardOverview />}
      />
      <Route
        path={PossibleRoutes.MotherboardCreate}
        element={<CreateMotherboard />}
      />
      <Route
        path={PossibleRoutes.MotherboardDetail}
        element={<MotherboardDetailContainer />}
      />
      <Route
        path={PossibleRoutes.MotherboardEdit}
        element={<MotherboardEditContainer />}
      />

      <Route path={PossibleRoutes.Cases} element={<CaseOverview />} />
      <Route path={PossibleRoutes.CaseCreate} element={<CreateCase />} />
      <Route path={PossibleRoutes.CaseDetail} element={<CaseDetailContainer />} />
      <Route path={PossibleRoutes.CaseEdit} element={<CaseEditContainer />} />

      <Route path={PossibleRoutes.Ram} element={<RamOverview />} />
      <Route path={PossibleRoutes.RamCreate} element={<CreateRam />} />
      <Route path={PossibleRoutes.RamDetail} element={<RamDetailContainer />} />
      <Route path={PossibleRoutes.RamEdit} element={<RamEditContainer />} />

      <Route path={PossibleRoutes.Gpus} element={<GpuOverview />} />
      <Route path={PossibleRoutes.GpuCreate} element={<CreateGpu />} />
      <Route path={PossibleRoutes.GpuDetail} element={<GpuDetailContainer/>} />
      <Route path={PossibleRoutes.GpuPartnerDetail} element={<GpuPartnerDetailContainer/>} />
      {/* FILL THIS IN */}
      {/* <Route path={PossibleRoutes.GpuEdit} element={<EditContainer />} /> */}

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
