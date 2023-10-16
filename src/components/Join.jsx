import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import style from "../SCSS/pages/_join.module.scss";

const Join = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password_check, setPassword_check] = useState("");
  const [name1, setName1] = useState("");
  const [nick, setNick] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("type");

  const [idErrMsg, setIdErrMsg] = useState(""); // id 에러 메세지
  const [idCheckMsg, setIdCheckMsg] = useState(""); // id 사용가능 메세지
  const [pwErrMsg, setPwErrMsg] = useState(""); // id 에러 메세지
  const [pwCheckMsg, setPwCheckMsg] = useState(""); // id 사용가능 메세지

  const JoinMember = async (e) => {
    e.preventDefault();
    let member = {
      user_id: id,
      user_pw: password,
      user_name: name1,
      user_nick: nick,
      user_phone: phone,
      user_type: type,
    };
    const response = await axios.post(
      "http://localhost:8085/CodeBridge/MemberJoin.do",
      member
    );
    console.log("리스폰스 확인", response);
  };

  const idValidation = async (e) => {
    console.log("id 확인", id);
    const regExp =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!regExp.test(e.target.value)) {
      setIdErrMsg("잘못된 형식의 이메일 주소입니다.");
    } else {
      setIdErrMsg("");
      let obj = {
        user_id: id,
      };
      const response = await axios
        .post("http://localhost:8085/CodeBridge/IdCheck.do", obj)
        .then((res) => {
          console.log("res", res.data);
          const resMessge = res.data;
          console.log("변수확인", resMessge);
          if (resMessge === "O") {
            setIdErrMsg("");
            setIdCheckMsg("사용 가능한 아이디입니다.");
          } else if (resMessge === "X") {
            setIdErrMsg("이미 사용중인 아이디입니다.");
            setIdCheckMsg("");
          }
        });
    }
  };

  const pw1check = async (e) => {
    const pwch = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/;
    if (!pwch.test(e.target.value)) {
      setPwErrMsg("비밀번호는 영문+숫자, 6자리이상이여야합니다.");
    } else {
      setPwErrMsg("사용할수 있는 비밀번호 입니다.");
    }
  };

  const pw2check = async (e) => {
    const pwch = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/;
    if (!pwch.test(e.target.value)) {
      setPwCheckMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setPwCheckMsg("비밀번호가 일치합니다.");
    }
  };

  return (
    <div className={style.wrap_container}>
      <div className={style.input_box}>
        <form onSubmit={JoinMember}>
          <h1>JoinPage</h1>
          <input
            type="email"
            placeholder="email"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onBlur={idValidation}
          />{" "}
          <br />
          <div id="idErrMsg">{idErrMsg}</div>
          <div>{idCheckMsg}</div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={pw1check}
          />{" "}
          <br />
          <input
            type="password"
            placeholder="password_check"
            value={password_check}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={pw2check}
          />{" "}
          <br />
          <input
            type="text"
            placeholder="Your name"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
          />{" "}
          <br />
          <input
            type="text"
            placeholder="Your nickname"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
          />{" "}
          <br />
          <input
            type="number"
            placeholder="Your number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />{" "}
          <br />
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="type">학생 or 선생 타입선택</option>
            <option value="0">Student</option>
            <option value="1">Teacher</option>
          </select>
          <br />
          <button type="submit">회원가입</button>
        </form>
      </div>
      <div id="error">
        <div id="iderror"></div>
        <div id="pwerror"></div>
        <div id="pwckerror"></div>
      </div>
    </div>
  );
};

export default Join;

/*  let check1 ="";
  let check2 ="";
  let check3 ="";
  let check4 ="";

  useEffect(() => {
    // jQuery 코드를 실행할 때 DOM이 렌더링된 후에 실행되도록 useEffect를 사용
    function joinCheck() {
      if (check1 === 1 && check2 === 1 && check3 === 1 && check4 === 1) {
        alert("회원가입 성공");
        return true;
      } else {
        alert("잘못입력된 정보가 있습니다.");
        return false;
      }
    } */
