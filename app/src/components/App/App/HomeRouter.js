import { PossibleRoutes } from "core/routing"
import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./Homepage/Home"
import LoginPage from "components/OnBoarding/Login/LoginPage"
import Builder from "./Builder/Builder"

const HomeRouter = ({setUser}) => {
  return (
    <Routes>
        <Route index path={PossibleRoutes.Home} element={<Home />} />
        <Route path={PossibleRoutes.Login} element={<LoginPage setUser={setUser}/>} />
        <Route index path={PossibleRoutes.Builder} element={<Builder />} />
        <Route path="*" element={<Navigate to={PossibleRoutes.Home} replace />} />
    </Routes>
  )
}

export default HomeRouter