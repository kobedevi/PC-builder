import { PossibleRoutes } from "core/routing"
import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./Homepage/Home"


const HomeRouter = () => {
  return (
    <>
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="*" element={<Navigate to={PossibleRoutes.Home} replace />} />
        </Routes>
    </>
  )
}

export default HomeRouter