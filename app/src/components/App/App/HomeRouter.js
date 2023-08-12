import { PossibleRoutes } from "core/routing"
import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./Homepage/Home"
import LoginPage from "components/OnBoarding/Login/LoginPage"
import Builder from "./Builder/Builder"
import RegisterPage from "components/OnBoarding/Login/RegisterPage"
import BuildDetail from "./Detail/BuildDetail"
import Nav from "./Homepage/Nav"
import BuildsOverview from "./Builds/BuildsOverview"
import GeneralBuildsOverview from "./Builds/GeneralBuildsOverview"
import UserBuildsOverview from "./Builds/UserBuildsOverview"

const HomeRouter = ({setUser}) => {
  return (
    <main className="public">
      <header>
        <Nav/>
      </header>
      <Routes>
        <Route index path={PossibleRoutes.Home} element={<Home />} />
        <Route path={PossibleRoutes.Register} element={<RegisterPage setUser={setUser}/>} />
        <Route path={PossibleRoutes.Login} element={<LoginPage setUser={setUser}/>} />
        <Route path={PossibleRoutes.Builder} element={<Builder />} />
        <Route path={PossibleRoutes.Builds} element={<GeneralBuildsOverview />} />
        <Route path={PossibleRoutes.UserBuilds} element={<UserBuildsOverview />} />
        <Route path={PossibleRoutes.BuildDetail} element={<BuildDetail />} />
        <Route path="*" element={<Navigate to={PossibleRoutes.Home} replace />} />
      </Routes>
    </main>
  )
}

export default HomeRouter