import React from "react";
import { Link } from "react-router-dom";

import style from "../SCSS/pages/_main.module.scss";

const Main = () => {
  return (
    <div className={style.wrap_container}>
      <button>
        <Link to={"Login"}>로그인</Link>
      </button>
      <button>
        <Link to={"Join"}>회원가입</Link>
      </button>
    </div>
  );
};

export default Main;
