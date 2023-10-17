import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

import Main from "./components/Main";
import SetInfo from "./components/SetInfo";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Join from "./components/Join";
// import StudyTest from "./components/StudyTest";
import DashBoard from "./components/DashBoard";
import DashLeftBox from "./components/DashLeftBox";
import ClassWrite from "./components/ClassWrite";
import CompilerTest from "./components/CompilerTest";
import ContainerTest from "./components/ContainerTest";
import TestList from "./components/TestList";
import TestWrite from "./components/TestWrite";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/SetInfo" element={<SetInfo />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Join" element={<Join />}></Route>
        <Route path="/DashBoard" element={<DashBoard />}></Route>
        <Route path="/DashLeftBox" element={<DashLeftBox />}></Route>
        {/* <Route path="/StudyTest" element={<StudyTest />}></Route> */}
        <Route path="/ClassWrite" element={<ClassWrite />}></Route>
        <Route path="/CompilerTest" element={<CompilerTest />}></Route>
        <Route path="/ContainerTest" element={<ContainerTest />}></Route>
        <Route path="/TestList" element={<TestList />}></Route>
        <Route path="/TestWrite" element={<TestWrite />}></Route>
      </Routes>
    </div>
  );
}

export default App;
