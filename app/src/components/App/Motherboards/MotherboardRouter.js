import { PossibleRoutes } from "core/routing"
import { Navigate, Route, Routes } from "react-router-dom"
import MotherboardOverview from "./MotherboardOverview"
import CreateMotherboard from "./create/CreateMotherboard"
import MotherboardDetailContainer from "./detail/MotherboardDetailContainer"
import MotherboardEditContainer from "./edit/MotherboardEditContainer"

const MotherboardRouter = () => {
  return (
    <Routes>
      <Route path={""} element={<MotherboardOverview />} />
      <Route path={PossibleRoutes.Create} element={<CreateMotherboard />} />
      <Route path={PossibleRoutes.Detail} element={<MotherboardDetailContainer />} />
      <Route path={PossibleRoutes.Edit} element={<MotherboardEditContainer />} />
      <Route path="*" element={<Navigate to={PossibleRoutes.Motherboards} replace />} />
    </Routes>
  )
}

export default MotherboardRouter