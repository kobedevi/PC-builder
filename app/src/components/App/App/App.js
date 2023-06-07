import { PossibleRoutes } from "core/routing"
import { Link } from "react-router-dom"
import MainRouting from "../MainRouting";
import HomeRouter from "./HomeRouter";


const App = ({setUser}) => {
  return (
    <div className="App reset">
      <div className="content">
        <div className="app scroller">
          <MainRouting setUser={setUser} />
        </div>
      </div>
    </div>
  )
}

export default App