import React from "react";
import Title from "./Title";
import Profile from "./Profile";

import style from "../SCSS/pages/_dashBoard.module.scss";

const DashBoard = () => {
  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Title pageName="Dash Board" />
        <Profile showEditButton={false} />

        <div className={style.main_content}>
          <div className={style.main_content_left}>
            <h4>커리큘럼</h4>
          </div>
          <div className={style.main_content_right}>
            <h4>To do List</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
