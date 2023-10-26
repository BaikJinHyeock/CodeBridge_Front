import React from "react";
import style from "../SCSS/pages/_dashadmin.module.scss";
import Profile from "./Profile";
import DashRightBoxTeacher from "./DashRightBoxTeacher";

const DashAdmin = () => {
  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Profile />
      </div>
      <DashRightBoxTeacher />
    </div>
  );
};

export default DashAdmin;
