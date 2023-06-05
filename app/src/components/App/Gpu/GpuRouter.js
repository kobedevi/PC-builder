import { PossibleRoutes } from "core/routing"
import { Navigate, Route, Routes } from "react-router-dom"
import GpuOverview from "./GpuOverview"
import CreateGpu from "./create/CreateGpu"
import GpuDetailContainer from "./detail/GpuDetailContainer"
import GpuPartnerDetailContainer from "./detail/GpuPartnerDetailContainer"
import GpuEditContainer from "./edit/GpuEditContainer"
import GpuPartnerEditContainer from "./edit/GpuPartnerEditContainer"

const GpuRouter = () => {
  return (
    <Routes>
      <Route path={""} element={<GpuOverview />} />
      <Route path={PossibleRoutes.Create} element={<CreateGpu />} />
      <Route path={PossibleRoutes.Detail} element={<GpuDetailContainer />} />
      <Route path={PossibleRoutes.GpuPartnerDetail} element={<GpuPartnerDetailContainer />} />
      <Route path={PossibleRoutes.Edit} element={<GpuEditContainer />} />
      <Route path={PossibleRoutes.GpuPartnerEditRouter} element={<GpuPartnerEditContainer />} />
      <Route path="*" element={<Navigate to={PossibleRoutes.Gpus} replace />} />
    </Routes>
  )
}

export default GpuRouter