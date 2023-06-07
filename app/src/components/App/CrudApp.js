import CrudRouting from "./CrudRouting";
import MainRouting from "./MainRouting";
import Sidebar from "./Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Design/Header";

function CrudApp() {
  return (
    <>
      <Header />
      <div className="App">
        <div className="content">
          <div className="app">
            <Sidebar />
            <main>
              {/* <CrudRouting /> */}
              <MainRouting />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default CrudApp;
