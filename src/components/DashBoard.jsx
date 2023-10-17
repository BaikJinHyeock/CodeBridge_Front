import React from "react";

import DashLeftBox from "./DashLeftBox";
import style from "../SCSS/pages/_dashBoard.module.scss";

const DashBoard = () => {
  return (
    <div className={style.wrap_container}>
      <DashLeftBox />
      <div></div>
    </div>
  );
};

export default DashBoard;
