import { PossibleRoutes } from "core/routing"
import { Navigate, Route, Routes } from "react-router-dom"
import StorageOverview from "./StorageOverview"
import StorageDetailContainer from "./detail/StorageDetailContainer"
import StorageEditContainer from "./edit/StorageEditContainer"
import CreateStorage from "./create/CreateStorage"

const StorageRouter = () => {
  return (
    <Routes>
      <Route path={""} element={<StorageOverview />} />
      <Route path={PossibleRoutes.Create} element={<CreateStorage />} />
      <Route path={PossibleRoutes.Detail} element={<StorageDetailContainer />} />
      <Route path={PossibleRoutes.Edit} element={<StorageEditContainer />} />
      <Route path="*" element={<Navigate to={PossibleRoutes.Storage} replace />} />
    </Routes>
  )
}

export default StorageRouter