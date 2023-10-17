import React from "react";
import { Link } from "react-router-dom";

import style from "../SCSS/pages/_dashLeftBox.module.scss";

const DashLeftBox = () => {
  return (
    <div className={style.left_wrap_container}>
      <ul>
        <li>
          <Link to={"/DashBoard"}>DashBoard</Link>
        </li>
        <li>
          <Link to={"#"}>내 강의실</Link>
        </li>
        <li>
          <Link to={"#"}>수강신청</Link>
        </li>
        <li>
          <Link to={"#"}>테스트</Link>
        </li>
      </ul>

      <div>
        <Link to={"/SetInfo"}>정보수정</Link>
      </div>
    </div>
  );
};

export default DashLeftBox;
