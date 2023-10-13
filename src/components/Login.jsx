import axios from "axios";
import React, {useState} from "react";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const LoginMember = async (e) => {
    e.preventDefault();
    let member ={
      user_id : id,
      user_pw : password
    };
    const response = await axios.post("http://localhost:8085/CodeBridge/MemberLogin.do", member);
    console.log('리스폰스 확인', response);
  }
  return (
    <div>
      <form onSubmit={LoginMember}>
      <h1>LoginPage</h1>
      <input type="text" placeholder="id" value={id} onChange={(e)=> setId(e.target.value)}></input> <br />
      <input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input> <br />
      <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
