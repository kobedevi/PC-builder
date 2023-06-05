import { PossibleRoutes } from "core/routing"
import { Navigate, Route, Routes } from "react-router-dom"
import CpuOverview from "./CpuOverview"
import CreateCpu from "./create/CreateCpu"
import CpuDetailContainer from "./detail/CpuDetailContainer"
import CpuEditContainer from "./edit/CpuEditContainer"

const CpuRouter = () => {
  return (
    <Routes>
      <Route path={""} element={<CpuOverview />} />
      <Route path={PossibleRoutes.Create} element={<CreateCpu />} />
      <Route path={PossibleRoutes.Detail} element={<CpuDetailContainer />} />
      <Route path={PossibleRoutes.Edit} element={<CpuEditContainer />} />
      <Route path="*" element={<Navigate to={PossibleRoutes.Cpus} replace />} />
    </Routes>
  )
}

export default CpuRouter