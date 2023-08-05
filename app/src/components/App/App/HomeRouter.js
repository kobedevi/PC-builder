import { PossibleRoutes } from "core/routing"
import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./Homepage/Home"
import LoginPage from "components/OnBoarding/Login/LoginPage"
import Builder from "./Builder/Builder"
import RegisterPage from "components/OnBoarding/Login/RegisterPage"
import BuildDetail from "./Detail/BuildDetail"

const HomeRouter = ({setUser}) => {
  return (
    <Routes>
        <Route index path={PossibleRoutes.Home} element={<Home />} />
        <Route path={PossibleRoutes.Register} element={<RegisterPage setUser={setUser}/>} />
        <Route path={PossibleRoutes.Login} element={<LoginPage setUser={setUser}/>} />
        <Route index path={PossibleRoutes.Builder} element={<Builder />} />
        <Route index path={PossibleRoutes.BuildDetail} element={<BuildDetail />} />
        <Route path="*" element={<Navigate to={PossibleRoutes.Home} replace />} />
    </Routes>
  )
}

export default HomeRouter