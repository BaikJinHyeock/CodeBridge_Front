import { Route, Routes } from "react-router-dom";

import "./main.css";

import Main from "./components/Main";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Join from "./components/Join";
import StudyTest from "./components/StudyTest";
import ClassWrite from "./components/ClassWrite";
import CompilerTest from "./components/CompilerTest";
import ContainerTest from "./components/ContainerTest";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/StudyTest" element={<StudyTest />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Join" element={<Join />}></Route>
        <Route path="/ClassWrite" element={<ClassWrite />}></Route>
        <Route path="/CompilerTest" element={<CompilerTest />}></Route>
        <Route path="/ContainerTest" element={<ContainerTest />}></Route>
      </Routes>
    </div>
  );
}

export default App;
