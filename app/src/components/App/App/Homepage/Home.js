import { Link } from "react-router-dom"
import Banner from "./Banner"
import { PossibleRoutes } from "core/routing"
import Nav from "./Nav";

const Home = () => {

  return (
    <>
      <Nav/>
      <Banner/>
    </>
  )
}

export default Home