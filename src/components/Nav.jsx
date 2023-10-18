import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import style from "../SCSS/pages/_nav.module.scss";

const Nav = () => {
  const [loginOk, setLoginOk] = useState(false);


  //로그인했으면 상단 로그인,회원가입변경
  useEffect(() => {
    const id = sessionStorage.getItem("memberId");
    memberSearching();
    if (id) {
      setLoginOk(true);
      console.log("memberId",id);
    }
  }, []);

    // 회원정보 조회
    const memberSearching = async () => {
      const id = sessionStorage.getItem("memberId");
      await axios
        .get("http://localhost:8085/CodeBridge/Member/join",id)
        .then((res) => {
          setMemberInfo(res.data.member);
        })
        .catch((err) => {
          console.log("err :", err);
        });
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
   ${memberId}
         {/*  {loginOk ?  : <Link to={"/Join"}>회원가입</Link>} */}
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