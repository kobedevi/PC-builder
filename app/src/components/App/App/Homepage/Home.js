import { Link } from "react-router-dom"
import Banner from "./Banner"
import { PossibleRoutes } from "core/routing"
import Nav from "./Nav";
import Featured from "./Featured";

const Home = () => {

  return (
    <>
      <Nav/>
      <Banner/>
      <div className="container">
        <Featured/>
      </div>
    </>
  )
}

export default Home