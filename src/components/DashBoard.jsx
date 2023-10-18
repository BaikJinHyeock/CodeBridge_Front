import React from "react";

import DashLeftBox from "./DashLeftBox";
import style from "../SCSS/pages/_dashBoard.module.scss";

const DashBoard = () => {
  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <h1>DashBoard</h1>
      </div>
    </div>
  );
};

export default DashBoard;
