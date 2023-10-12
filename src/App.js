import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./components/Test";
import studyTest from "./components/studyTest";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Test />}></Route> */}
        <Route path="/" element={<studyTest />}></Route>
      </Routes>
    </div>
  );
}

export default App;
