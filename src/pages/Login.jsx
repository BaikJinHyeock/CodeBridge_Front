import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import style from "../SCSS/pages/_login.module.scss";
// import "../main.css";

const Login = () => {

    // 스프링 주소
    const baseUrl = process.env.REACT_APP_BASE_URL;

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const LoginMember = async (e) => {
    e.preventDefault();
    let member = {
      user_id: id,
      user_pw: password,
    };
    const response = await axios.post(
      `${baseUrl}/CodeBridge/member/login`,
      member
    );
    if (response.data === "Y") {
      const res = await axios.get(`${baseUrl}/CodeBridge/member/memberInfoTeacher?user_id=${id}`);
      sessionStorage.setItem("memberId", id);
      sessionStorage.setItem("user_name", res.data[0].user_name)
      sessionStorage.setItem("user_nick", res.data[0].user_nick)
      window.location.href = "/";
    } else if (response.data === "N") {
      return alert("입력하신 정보가 없습니다.");
    }
  };

  const moveJoin = () => {
    navigate("/Join");
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
          <button
            type="submit"
            className={style.join_button}
            onClick={moveJoin}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
