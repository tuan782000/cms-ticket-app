import "./assets/css/App.css";
import "./assets/css/Home.css";
// import "./assets/css/Normalcss.css";
// import InputCheckBox from "./component/InputCheckBox";
import Routers from "./routes/Routes";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routers />
        {/* <InputCheckBox/> */}
      </div>
      
    </div>
  );
}

export default App;
