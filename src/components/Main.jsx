import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <button>
        <Link to={"Login"}>로그인</Link>
      </button>
      <button>
        <Link to={"Join"}>회원가입</Link>
      </button>
    </div>
  );
};

export default Main;
