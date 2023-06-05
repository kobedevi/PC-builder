import { PossibleRoutes } from "core/routing"
import { Navigate, Route, Routes } from "react-router-dom"
import RamOverview from "./RamOverview"
import CreateRam from "./create/CreateRam"
import RamDetailContainer from "./detail/RamDetailContainer"
import RamEditContainer from "./edit/RamEditContainer"

const RamRouter = () => {
  return (
    <Routes>
      <Route path={""} element={<RamOverview />} />
      <Route path={PossibleRoutes.Create} element={<CreateRam />} />
      <Route path={PossibleRoutes.Detail} element={<RamDetailContainer />} />
      <Route path={PossibleRoutes.Edit} element={<RamEditContainer />} />
      <Route path="*" element={<Navigate to={PossibleRoutes.Cpus} replace />} />
    </Routes>
  )
}

export default RamRouter