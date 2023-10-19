import React from "react";
import Title from "./Title";
import Profile from "./Profile";

import style from "../SCSS/pages/_dashBoard.module.scss";

const DashBoard = () => {
  const CurriList = () => {
    return (
      <div className={style.curriList_item}>
        <div>
          <span>3주차</span>
        </div>
        <div>
          <span>IoT 센싱 및 데이터수집</span>
        </div>
      </div>
    );
  };

  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Title pageName="Dash Board" />
        <Profile showEditButton={false} />

        <div className={style.main_content}>
          <div className={style.main_content_left}>
            <h4>커리큘럼</h4>
            <div className={style.main_content_left_curriList}>
              <CurriList />
              <CurriList />
              <CurriList />
              <CurriList />
            </div>
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
