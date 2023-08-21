import Banner from "./Banner"
import Nav from "./Nav";
import Featured from "./Featured";

const Home = () => {

  return (
    <>
      <header>
        <Nav/>
      </header>
      <Banner/>
      <div className="container">
        <Featured/>
      </div>
    </>
  )
}

export default Home