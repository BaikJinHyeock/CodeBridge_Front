import React from "react";
import style from "../SCSS/pages/_classRoom.module.scss";

export const ClassRoom = () => {
  return (
    <div className={style.main_container}>
      <h1>CodeBridge VSCODE 테스트</h1>
      <iframe src="http://59.0.234.207:8083/?folder=/home/smhrd/test">
      </iframe>


    </div>
  );
};

export default ClassRoom;
