import MainRouting from "./MainRouting";
import Sidebar from "./Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Design/Header";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <div className="content">
          <div className="app">
            <Sidebar />
            <main>
              <MainRouting />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
