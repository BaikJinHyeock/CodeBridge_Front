import React from "react";

const Join = () => {
  return (
    <div>
      <form>
        <h1>JoinPage</h1>
        <input type="email" placeholder="email"></input> <br />
        <input type="password" placeholder="password"></input> <br />
        <input type="text" placeholder="Your name"></input> <br />
        <input type="number" placeholder="Your number"></input> <br />
        <input type="text" placeholder="Nickname"></input> <br />
        <select>
          <option value="none">학생 or 선생 타입선택</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Join;
