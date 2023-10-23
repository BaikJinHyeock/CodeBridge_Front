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
  // const [type, setType] = useState("type");

  const [idErrMsg, setIdErrMsg] = useState(""); // 아이디(이메일)형식 에러 메세지
  const [idCheckMsg, setIdCheckMsg] = useState(""); // 아이디 사용가능 메세지
  const [pwErrMsg, setPwErrMsg] = useState(""); // 패스워드형식 에러 메세지
  const [pwCheckMsg, setPwCheckMsg] = useState(""); // 패스워드 일치 사용가능 메세지
  const [nameCheckMsg, setNameCheckMsg] = useState(""); // 패스워드 일치 사용가능 메세지
  const [nickCheckMsg, setNickCheckMsg] = useState(""); // 패스워드 일치 사용가능 메세지
  const [phoneCheckMsg, setphoneCheckMsg] = useState(""); // 휴대폰번호 사용가능 메세지

  const [check1, setCheck1] = useState("0");
  const [check2, setCheck2] = useState("0");
  const [check3, setCheck3] = useState("0");
  const [check4, setCheck4] = useState("0");
  const [check5, setCheck5] = useState("0");
  const [check6, setCheck6] = useState("0");
  

  const JoinMember = async (e) => {
    console.log("check1 확인", check1);
    e.preventDefault();
    if (
      check1 === 1 &&
      check2 === 1 &&
      check3 === 1 &&
      check4 === 1 &&
      check5 === 1 &&
      check6 === 1
    ) {
      console.log("진입완료1");

      let member = {
        user_id: id,
        user_pw: password,
        user_name: name1,
        user_nick: nick,
        user_phone: phone,
        // user_type: type,
      };
      const response = await axios.post(
        "http://localhost:8085/CodeBridge/Member/join",
        member
      );

      alert("회원가입 성공");
      console.log("리스폰스 확인", response);
      window.location.href = "/Login";
    } else {
      return alert("잘못입력된 정보가 있습니다.");
    }
  };

  //아이디중복확인,형식 메소드
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
        .post("http://localhost:8085/CodeBridge/Member/idCheck", obj)
        .then((res) => {
          console.log("res", res.data);
          const resMessge = res.data;
          console.log("변수확인", resMessge);
          if (resMessge === "O") {
            setIdErrMsg("");
            setIdCheckMsg("사용 가능한 아이디입니다.");
            setCheck1(1);
          } else if (resMessge === "X") {
            setIdErrMsg("이미 사용 중인 아이디입니다.");
            setIdCheckMsg("");
          }
        });
    }
  };

  const pw1check = async (e) => {
    const pwch = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/;

    if (!pwch.test(e.target.value)) {
      setPwErrMsg("비밀번호는 6 ~ 20자로 영문, 숫자를 조합해서 사용하세요.");
      setCheck2(0);
    } else {
      setPwErrMsg("사용 가능한 비밀번호 입니다.");
      setCheck2(1);
    }
  };

  const pw2check = async (e) => {
    if (password != password_check) {
      setPwCheckMsg("비밀번호가 일치하지 않습니다.");
      setCheck3(0);
    } else if (password.length > 1 && password == password_check) {
      setPwCheckMsg("비밀번호가 일치합니다.");
      setCheck3(1);
    }
  };

  const phonecheck = async (e) => {
    const phcheck = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!phcheck.test(e.target.value)) {
      setphoneCheckMsg("휴대폰번호 형식에 어긋납니다.");
      setCheck4(0);
    } else {
      setphoneCheckMsg("");
      setCheck4(1);
    }
  };

  const koreanVowelRegex = /^[ㅏ-ㅣ]/;
  const namecheck = async (e) => {
    if (name1.length < 2 || name1.length > 5 || koreanVowelRegex.test(name1[0])) {
      setNameCheckMsg("이름을 정확하게 입력해주세요");
      setCheck5(0);
    } else {
      setNameCheckMsg("");
      setCheck5(1);
    }
  };

  const nickcheck = async (e) => {
    if (nick.length < 2 || nick.length > 10 || koreanVowelRegex.test(nick[0])) {
      setNickCheckMsg("닉네임을 입력해주세요");
      setCheck6(0);
    } else {
      setNickCheckMsg("");
      setCheck6(1);
    }
  };

  return (
    <div className={style.wrap_container}>
      <div className={style.input_container}>
        <form onSubmit={JoinMember}>
          <h1>Join to Code Bridge</h1>

          <div>
            <div className={style.input_box}>
              <input
                type="email"
                placeholder="이메일"
                value={id}
                onChange={(e) => setId(e.target.value)}
                onBlur={idValidation}
              />
              <span>{idErrMsg}</span>
              <span>{idCheckMsg}</span>
            </div>

            <div className={style.input_box}>
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={pw1check}
              />
              <span>{pwErrMsg}</span>
            </div>

            <div className={style.input_box}>
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={password_check}
                onChange={(e) => setPassword_check(e.target.value)}
                onBlur={pw2check}
              />
              <span>{pwCheckMsg}</span>
            </div>

            <div className={style.input_box}>
              <input
                type="text"
                placeholder="이름"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                onBlur={namecheck}
              />
              <span>{nameCheckMsg}</span>
            </div>

            <div className={style.input_box}>
              <input
                type="text"
                placeholder="닉네임"
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                onBlur={nickcheck}
              />
              <span>{nickCheckMsg}</span>
            </div>

            <div className={style.input_box}>
              <input
                type="text"
                placeholder="휴대폰"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={phonecheck}
              />
              <span>{phoneCheckMsg}</span>
            </div>

            {/* <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="type">학생 or 선생 타입선택</option>
              <option value="0">Student</option>
              <option value="1">Teacher</option>
            </select> */}

            <button type="submit" className={style.join_button}>
              회원가입
            </button>
          </div>
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
