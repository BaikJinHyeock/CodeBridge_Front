import { Route, Routes, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

import Join from "./components/Join";
import Login from "./components/Login";
import Main from "./components/Main";
import Nav from "./components/Nav";
import SetInfo from "./components/SetInfo";
import Team from "./components/Team";
// import StudyTest from "./components/StudyTest";
import { ClassRoom } from "./components/ClassRoom";
import ClassWrite from "./components/ClassWrite";
import DashBoard from "./components/DashBoard";
import DashLeftBox from "./components/DashLeftBox";
import DashRightBox from "./components/DashRightBox";

import TestDetail from "./components/TestDetail";
import TestSetList from "./components/TestSetList";
import TestWrite from "./components/TestWrite";

import MarkDetail from "./components/MarkDetail";
import MarkList from "./components/MarkList";
import Profile from "./components/Profile";
import SubWrite from "./components/SubWrite";
import Title from "./components/Title";
import TestList from "./components/TestList";

function App() {
  const location = useLocation();
  const RenderLeftBox = () => {
    return (
      location.pathname !== "/" &&
      location.pathname !== "/Login" &&
      location.pathname !== "/Join" &&
      location.pathname !== "/ClassWrite" &&
      location.pathname !== "/TestWrite" &&
      location.pathname !== "/SetInfo" &&
      location.pathname !== "/SubWrite"&&
      location.pathname !== "/Team"
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
          <Route path="/Team" element={<Team />}></Route>

          <Route path="/DashBoard" element={<DashBoard />}></Route>
          <Route path="/DashLeftBox" element={<DashLeftBox />}></Route>
          <Route path="/DashRighttBox" element={<DashRightBox />}></Route>

          {/* <Route path="/StudyTest" element={<StudyTest />}></Route> */}
          <Route path="/ClassRoom" element={<ClassRoom />}></Route>
          <Route path="/ClassWrite" element={<ClassWrite />}></Route>

          <Route path="/SubWrite" element={<SubWrite />}></Route>

          <Route path="/TestList" element={<TestList />}></Route>
          <Route path="/TestSetList" element={<TestSetList />}></Route>
          <Route path="/TestWrite" element={<TestWrite />}></Route>
          <Route path="/TestDetail" element={<TestDetail />}></Route>

          <Route path="/MarkList" element={<MarkList />}></Route>
          <Route path="/MarkDetail" element={<MarkDetail />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
