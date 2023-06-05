import { PossibleRoutes } from "core/routing"
import { Navigate, Route, Routes } from "react-router-dom"
import HomeOverview from "./HomeOverview"

const Home = () => {
  return (
    <>
        <Routes>
            <Route path="" element={<HomeOverview />} />
            <Route path="*" element={<Navigate to={PossibleRoutes.HomeOverview} replace />} />
        </Routes>
    </>
  )
}

export default Home