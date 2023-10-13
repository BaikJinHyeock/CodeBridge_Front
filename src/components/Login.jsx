import React from "react";

import style from "../SCSS/pages/_login.module.scss";

const Login = () => {
  return (
    <div className={style.wrap_container}>
      <div className={style.input_box}>
        <h1>Log in to Code Bridge</h1>
        <input type="text" placeholder="id"></input> <br />
        <input type="password" placeholder="password"></input> <br />
        <button type="submit">로그인</button>
        <div className={style.division_line}>
          <div>
            <span>OR</span>
          </div>
        </div>
        <button type="submit">회원가입</button>
      </div>
    </div>
  );
};

export default Login;
