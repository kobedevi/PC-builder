import { PossibleRoutes } from "core/routing"
import { Link } from "react-router-dom"
import MainRouting from "../MainRouting";
import HomeRouter from "./HomeRouter";


const App = () => {
  return (
    <>
      <div className="App reset">
        <div className="content">
          <div className="app">
            <HomeRouter />
          </div>
        </div>
      </div>
    </>
  )
}

export default App