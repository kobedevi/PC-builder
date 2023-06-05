import { PossibleRoutes } from "core/routing"
import { Navigate, Route, Routes } from "react-router-dom"
import CpuCoolerOverview from "./CpuCoolerOverview"
import CreateCpuCooler from "./create/CreateCpuCooler"
import CpuCoolerDetailContainer from "./detail/CpuCoolerDetailContainer"
import CpuCoolerEditContainer from "./edit/CpuCoolerEditContainer"

const CpuRouter = () => {
  return (
    <Routes>
      <Route path={""} element={<CpuCoolerOverview />} />
      <Route path={PossibleRoutes.Create} element={<CreateCpuCooler />} />
      <Route path={PossibleRoutes.Detail} element={<CpuCoolerDetailContainer />} />
      <Route path={PossibleRoutes.Edit} element={<CpuCoolerEditContainer />} />
      <Route path="*" element={<Navigate to={PossibleRoutes.CpuCoolers} replace />} />
    </Routes>
  )
}

export default CpuRouter