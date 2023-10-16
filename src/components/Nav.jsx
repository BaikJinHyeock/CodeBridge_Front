import React from "react";
import { Link } from "react-router-dom";

import style from "../SCSS/pages/_nav.module.scss";

const Nav = () => {
  return (
    <div className={style.Wrap_container}>
      <div className={style.left_container}>
        <Link to={"/"}>Code Bridge</Link>
        <ul>
          <li>
            <Link to={"#"}>교육과정</Link>
          </li>
          <li>
            <Link to={"#"}>회사소개</Link>
          </li>
          <li>
            <Link to={"#"}>강의실 생성</Link>
          </li>
          <li>
            <Link to={"#"}>테스트 관리자</Link>
          </li>
        </ul>
      </div>

      <div className={style.right_container}>
        <ul>
          <li>
            <Link to={"/Login"}>로그인</Link>
          </li>
          <li>
            <Link to={"/Join"}>회원가입</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
