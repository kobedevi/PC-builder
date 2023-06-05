import { PossibleRoutes } from "core/routing"
import { Navigate, Route, Routes } from "react-router-dom"
import CaseOverview from "./CaseOverview"
import CreateCase from "./create/CreateCase"
import CaseDetailContainer from "./detail/CaseDetailContainer"
import CaseEditContainer from "./edit/CaseEditContainer"

const CaseRouter = () => {
  return (
    <Routes>
      <Route path={""} element={<CaseOverview />} />
      <Route path={PossibleRoutes.Create} element={<CreateCase />} />
      <Route path={PossibleRoutes.Detail} element={<CaseDetailContainer />} />
      <Route path={PossibleRoutes.Edit} element={<CaseEditContainer />} />
      <Route path="*" element={<Navigate to={PossibleRoutes.Cases} replace />} />
    </Routes>
  )
}

export default CaseRouter