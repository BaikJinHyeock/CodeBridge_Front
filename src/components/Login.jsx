import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import style from "../SCSS/pages/_login.module.scss";
// import "../main.css";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const LoginMember = async (e) => {
    e.preventDefault();
    let member = {
      user_id: id,
      user_pw: password,
    };
    console.log("member 확인", member);
    const response = await axios.post(
      "http://localhost:8085/CodeBridge/Login",
      member
    );
    console.log("리스폰스 확인", response);
    console.log(response.data);
    if (response.data === "Y") {
      sessionStorage.setItem("memberId", response.data);
      window.location.href = "/";
      alert("로그인성공!");
    } else if (response.data === "N") {
      return alert("입력하신 정보가 없습니다.");
    }
  };
  return (
    <div className={style.wrap_container}>
      <div className={style.input_box}>
        <form onSubmit={LoginMember}>
          <h1>Log in to Code Bridge</h1>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            type="submit"
            className={style.login_button}
            id="submit_login"
          >
            로그인
          </button>
          <div className={style.division_line}>
            <div>
              <span>OR</span>
            </div>
          </div>
          <button type="submit" className={style.join_button}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
