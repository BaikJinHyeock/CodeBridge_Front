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
import { ClassRoom } from "./components/ClassRoom";
import ClassWrite from "./components/ClassWrite";
import CompilerTest from "./components/CompilerTest";
import ContainerTest from "./components/ContainerTest";
import MarkList from "./components/MarkList";
import TestList from "./components/TestList";
import TestWrite from "./components/TestWrite";
import TestDetail from "./components/TestDetail";
import MarkDetail from "./components/MarkDetail";
import Title from "./components/Title";
import Profile from "./components/Profile";

function App() {
  const location = useLocation();
  const RenderLeftBox = () => {
    return (
      location.pathname !== "/" &&
      location.pathname !== "/Login" &&
      location.pathname !== "/Join" &&
      location.pathname !== "/ClassWrite" &&
      location.pathname !== "/TestWrite" &&
      location.pathname !== "/SetInfo"
    );
  };

  const RenderHeader = () => {
    return location.pathname !== "/Login" && location.pathname !== "/Join";
  };

  return (
    <>
      {RenderHeader() && <Nav />}
      <div className="App">
        {RenderLeftBox() && <DashLeftBox />}
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/Title" element={<Title />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/SetInfo" element={<SetInfo />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Join" element={<Join />}></Route>
          <Route path="/DashBoard" element={<DashBoard />}></Route>
          <Route path="/DashLeftBox" element={<DashLeftBox />}></Route>
          {/* <Route path="/StudyTest" element={<StudyTest />}></Route> */}
          <Route path="/ClassRoom" element={<ClassRoom />}></Route>
          <Route path="/ClassWrite" element={<ClassWrite />}></Route>
          <Route path="/CompilerTest" element={<CompilerTest />}></Route>
          <Route path="/ContainerTest" element={<ContainerTest />}></Route>
          <Route path="/MarkList" element={<MarkList />}></Route>
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
