import { PossibleRoutes } from "core/routing"
import { Navigate, Route, Routes } from "react-router-dom"
import PsuOverview from "./PsuOverview"
import CreatePsu from "./create/CreatePsu"
import PsuDetailContainer from "./detail/PsuDetailContainer"
import PsuEditContainer from "./edit/PsuEditContainer"

const PsuRouter = () => {
  return (
    <Routes>
      <Route path={""} element={<PsuOverview />} />
      <Route path={PossibleRoutes.Create} element={<CreatePsu />} />
      <Route path={PossibleRoutes.Detail} element={<PsuDetailContainer />} />
      <Route path={PossibleRoutes.Edit} element={<PsuEditContainer />} />
      <Route path="*" element={<Navigate to={PossibleRoutes.Psus} replace />} />
    </Routes>
  )
}

export default PsuRouter