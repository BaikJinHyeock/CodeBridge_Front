import { Route, Routes, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

import Join from "./pages/Join";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SetInfo from "./pages/SetInfo";
import Team from "./pages/Team";

import ClassRoom from "./pages/ClassRoom";
import ClassDetail from "./pages/ClassDetail";
import ClassWrite from "./pages/ClassWrite";

import DashBoard from "./pages/DashBoard";
import DashAdmin from "./pages/DashAdmin";
import DashLeftBox from "./components/DashLeftBox";
import DashRightBox from "./components/DashRightBox";
import DashRightBoxTeacher from "./components/DashRightBoxTeacher";

import TestDetail from "./pages/TestDetail";
import TestSetList from "./pages/TestSetList";
import TestWrite from "./pages/TestWrite";

import MarkDetail from "./pages/MarkDetail";
import MarkList from "./pages/MarkList";
import Profile from "./components/Profile";
import SubWrite from "./pages/SubWrite";
import TestList_student from "./pages/TestList_student";
import TestList_teacher from "./pages/TestList_teacher";
import LiveChat from "./components/LiveChat";

function App() {
  const location = useLocation();
  const RenderLeftBox = () => {
    return (
      location.pathname !== "/" &&
      location.pathname !== "/Login" &&
      location.pathname !== "/Join" &&
      location.pathname !== "/ClassWrite" &&
      location.pathname !== "/ClassDetail" &&
      location.pathname !== "/TestWrite" &&
      location.pathname !== "/SetInfo" &&
      location.pathname !== "/SubWrite" &&
      location.pathname !== "/Team"
    );
  };

  const RenderHeader = () => {
    return location.pathname !== "/Login" && location.pathname !== "/Join";
  };
  const RenderFooter = () => {
    return (
      location.pathname !== "/Login" &&
      location.pathname !== "/Join" &&
      location.pathname !== "/DashBoard" &&
      location.pathname !== "/DashAdmin" &&
      location.pathname !== "/ClassRoom" &&
      location.pathname !== "/ClassWrite" &&
      location.pathname !== "/ClassDetail" &&
      location.pathname !== "/TestWrite" &&
      location.pathname !== "/TestDetail" &&
      location.pathname !== "/TestList/student" &&
      location.pathname !== "/TestList/teacher" &&
      location.pathname !== "/MarkList" &&
      location.pathname !== "/MarkDetail" &&
      location.pathname !== "/SetInfo" &&
      location.pathname !== "/SubWrite"
    );
  };

  return (
    <>
      {RenderHeader() && <Nav />}
      <div className="App">
        {RenderLeftBox() && <DashLeftBox />}
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/Footer" element={<Footer />}></Route>

          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/SetInfo" element={<SetInfo />}></Route>

          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Join" element={<Join />}></Route>
          <Route path="/Team" element={<Team />}></Route>

          <Route path="/DashBoard" element={<DashBoard />}></Route>
          <Route path="/DashAdmin" element={<DashAdmin />}></Route>
          <Route path="/DashLeftBox" element={<DashLeftBox />}></Route>
          <Route path="/DashRighttBox" element={<DashRightBox />}></Route>
          <Route
            path="/DashRightBoxTeacher"
            element={<DashRightBoxTeacher />}
          ></Route>

          <Route path="/ClassDetail" element={<ClassDetail />}></Route>
          <Route path="/ClassRoom" element={<ClassRoom />}></Route>
          <Route path="/ClassWrite" element={<ClassWrite />}></Route>

          <Route path="/SubWrite" element={<SubWrite />}></Route>

          <Route
            path="/TestList/student"
            element={<TestList_student />}
          ></Route>
          <Route
            path="/TestList/teacher"
            element={<TestList_teacher />}
          ></Route>
          <Route path="/TestSetList" element={<TestSetList />}></Route>
          <Route path="/TestWrite" element={<TestWrite />}></Route>
          <Route path="/TestDetail" element={<TestDetail />}></Route>

          <Route path="/MarkList" element={<MarkList />}></Route>
          <Route path="/MarkDetail" element={<MarkDetail />}></Route>


          <Route path="/LiveChat" element={<LiveChat />}></Route>


        </Routes>
      </div>

      {RenderFooter() && <Footer />}
    </>
  );
}

export default App;
