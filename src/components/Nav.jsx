import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import style from "../SCSS/pages/_nav.module.scss";
import axios from "axios";

const Nav = () => {
  const [loginOk, setLoginOk] = useState(false);
  const [userpic, setUserpic] = useState("");


  // 로그인했으면 상단 로그인,회원가입변경
  const id = sessionStorage.getItem("memberId");
  useEffect(() => {
    if (id) {
      setLoginOk(true);
      memberSearching();
    }
  }, []);


  // 회원정보 조회
  const memberSearching = async () => {

    console.log("로그인이 되어있나", id);
    let mem = {
      user_id: id
    };
    const response = await axios.post("http://localhost:8085/CodeBridge/Member/memcheck", mem);
    setUserpic(response.data[0].user_pic)

  };



  return (
    <div className={style.Wrap_container}>
      <div className={style.left_container}>
        <h1>
          <Link to={"/"}>Code Bridge</Link>
        </h1>
        <ul>
          <li>
            <Link to={"#"}>교육과정</Link>
          </li>
          <li>
            <Link to={"#"}>회사소개</Link>
          </li>
          <li>
            <Link to={"#"}>강의실 생성</Link>
          </li>
          <li>
            <Link to={"#"}>테스트 관리자</Link>
          </li>
        </ul>
      </div>

      <div className={style.right_container}>
        <ul>
          <li>
            {loginOk ? <Link to={"/DashBoard"}>대쉬보드</Link> : <Link to={"/Login"}>로그인</Link>}
          </li>
          <li>
            {loginOk ? <p>{userpic}</p> : <Link to={"/Join"}>회원가입</Link>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;




/* 
  const { myInfo, setMyInfo } = useContext(QuillContext)

  const [loginOk, setLoginOk] = useState(false);


useEffect(() => {
  const id = sessionStorage.getItem("memberId");
  memberSearching();
  if (id) {
    setLoginOk(true);
  }
  showMessageListDetail();
}, []);

  const goLogout = () => {
    sessionStorage.removeItem("memberId");
    setLoginOk(false);
    setMyInfo({ profileImg: null });
  };

   {loginOk ? <Member_profile /> : <Link to={"/join"}>회원가입</Link>}

 */