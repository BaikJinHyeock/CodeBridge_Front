import axios from "axios";
import React, { useState } from "react";

import style from "../SCSS/pages/_login.module.scss";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const LoginMember = async (e) => {
    e.preventDefault();
    let member = {
      user_id: id,
      user_pw: password
    };
    const response = await axios.post("http://localhost:8085/CodeBridge/MemberLogin.do", member);
    console.log('리스폰스 확인', response);
  }
  return (
    <div className={style.wrap_container}>
      <div className={style.input_box}>
        <form onSubmit={LoginMember}>
          <h1>Log in to Code Bridge</h1>
          <input type="text" placeholder="id" value={id} onChange={(e) => setId(e.target.value)}></input>
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <button type="submit">로그인</button>
          <div className={style.division_line}>
            <div>
              <span>OR</span>
            </div>
          </div>
          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
      );
};

      export default Login;
