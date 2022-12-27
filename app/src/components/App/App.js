import MainRouting from "./MainRouting";
import Sidebar from "./Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <h1>CRUD Pc-Parts</h1>
      <div className="content">
        <div className="app">
          <Sidebar />
          <main>
            <MainRouting />
            {/* TODO: frontend validation for string length etc... */}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
