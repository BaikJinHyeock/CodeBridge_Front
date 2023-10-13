import { async } from "q";
import React from "react";

const Join = () => {

  const JoinMember = async (e) => {
    e.preventDefault();
    let member = {
      user_id: id,
      user_pw: passowrd,
      user_name: name1,
      user_nick: nick,
      user_phone: phone,
      user_type: type
    };
    try{
      const response = await axois.post("http://localhost:8085/MemberJoin")
    }
  }


  return (
    <div>
      <form onSubmit={JoinMember}>
        <h1>JoinPage</h1>
        <input type="email" placeholder="email" value="id"></input> <br />
        <input type="password" placeholder="password" value="pw"></input> <br />
        <input type="text" placeholder="Your name" value="name1"></input> <br />
        <input type="text" placeholder="Your nickname" value="nick"></input> <br />
        <input type="number" placeholder="Your number" value="phone"></input> <br />
        <input type="text" placeholder="Nickname"></input> <br />
        <select name="type">
          <option value="type">학생 or 선생 타입선택</option>
          <option value="1">Student</option>
          <option value="0">Teacher</option>
        </select>
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};



export default Join;
