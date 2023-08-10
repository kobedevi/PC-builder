import { PossibleRoutes } from "core/routing"
import { Navigate, Route, Routes } from "react-router-dom"
import UserOverview from "./UserOverview"

const UserRouter = () => {
  return (
    <Routes>
      <Route path={""} element={<UserOverview />} />
      <Route path="*" element={<Navigate to={PossibleRoutes.Users} replace />} />
    </Routes>
  )
}

export default UserRouter