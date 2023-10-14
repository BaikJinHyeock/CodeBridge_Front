import React, { useState } from "react";
import axios from "axios";

const Join = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name1, setName1] = useState("");
  const [nick, setNick] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("type");

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

  return (
    <div>
      <form onSubmit={JoinMember}>
        <h1>JoinPage</h1>
        <input
          type="email"
          placeholder="email"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />{" "}
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
  );
};

export default Join;
