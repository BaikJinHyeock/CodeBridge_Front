import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Join from "./components/Join";
import StudyTest from "./components/StudyTest";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/StudyTest" element={<StudyTest />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Join" element={<Join />}></Route>
      </Routes>
    </div>
  );
}

export default App;
