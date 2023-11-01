import React from "react";
import style from "../SCSS/pages/_classRoom.module.scss";
import LiveChatTest from "../components/LiveChatTest";

export const ClassRoom = () => {
  return (
    <div className={style.main_container}>
      <iframe src="http://59.0.234.207:8083/?folder=/home/smhrd/test"></iframe>
      {/* <iframe src="http://59.0.249.27:8071/"></iframe> */}
      <div className={style.main_container_right}>
        <div className={style.main_container_right_buttons}>
          <button type="button">선생님 화면 보러가기</button>
          <button type="button">도움요청</button>
        </div>
        <div className={style.main_container_right_chat}>
          <LiveChatTest />
        </div>
      </div>
    </div>
  );
};

export default ClassRoom;
