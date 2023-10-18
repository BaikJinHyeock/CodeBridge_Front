import { Route, Routes, useLocation } from "react-router-dom";

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
import TestDetail from "./components/TestDetail";
import MarkDetail from "./components/MarkDetail";


function App() {
  const location = useLocation();
  const RenderHeaderAndFooter = () => {
    return (
      location.pathname !== "/" &&
      location.pathname !== "/Login" &&
      location.pathname !== "/Join" &&
      location.pathname !== "/ClassWrite" &&
      location.pathname !== "/TestWrite"
    );
  };

  return (
    <>
      <Nav />
      <div className="App">
        {RenderHeaderAndFooter() && <DashLeftBox />}
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
          <Route path="/TestDetail" element={<TestDetail />}></Route>
          <Route path="/MarkDetail" element={<MarkDetail />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
