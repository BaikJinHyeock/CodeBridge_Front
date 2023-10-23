import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../SCSS/pages/_nav.module.scss";
import axios from "axios";
import Image from "react-bootstrap/Image";

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
      user_id: id,
    };
    const response = await axios.post(
      "http://localhost:8085/CodeBridge/Member/memcheck",
      mem
    );
    setUserpic(response.data[0].user_pic);
  };

  return (
    <div className={style.Wrap_container}>
      <div className={style.left_container}>
        <Link to={"/"}>
          <div className={style.logo_wrapper}>
            <div className="image-component sc-htpNat enshqJ" width="49.34838699217041" height="35.19765974185239" style={{ width: "49.3484px", height: "35.1977px", backgroundColor: "blue" }}>
              <div className="sc-bxivhb fPcvdL">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlinkHref="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.com/svgjs" width="100%" height="100%" viewBox="4.165999889373779 16.71299934387207 87.56563568115234 62.45600128173828">
                  <g fill="#ffffff">
                    <path d="M29.168 58.332h37.5v-4.164h-37.5zm0-28.695c5.184 10.871 11.367 16.195 18.75 16.195 7.383 0 13.566-5.324 18.75-16.195V50h-37.5zm60.414 24.531a2.085 2.085 0 0 0 0-4.168h-18.75V29.637c5.184 10.871 11.367 16.195 18.75 16.195 1.152 0 2.086-.933 2.086-2.082s-.934-2.082-2.086-2.082c-7.297 0-13.641-7.93-18.852-23.578-.652-1.836-3.309-1.836-3.96 0-5.216 15.648-11.56 23.578-18.853 23.578-7.3 0-13.645-7.93-18.855-23.578-.648-1.836-3.309-1.836-3.957 0C19.886 33.738 13.546 41.668 6.25 41.668c-1.148 0-2.082.934-2.082 2.082s.934 2.082 2.082 2.082c7.383 0 13.566-5.324 18.75-16.195V50H6.25a2.084 2.084 0 0 0 0 4.168H25v4.164H6.25a2.085 2.085 0 0 0 0 4.168H25V75h-2.082a2.085 2.085 0 1 0 0 4.168h8.332a2.085 2.085 0 0 0 0-4.168h-2.082V62.5h37.5V75h-2.086a2.084 2.084 0 0 0 0 4.168h8.336a2.085 2.085 0 0 0 0-4.168h-2.086V62.5h18.75a2.085 2.085 0 1 0 0-4.168h-18.75v-4.164z" fillRule="evenodd">
                    </path>
                  </g>
                </svg>
              </div>
            </div>
            <h1>
              Code Bridge
            </h1>
          </div>
        </Link>
        <ul>
          <li>
            <Link to={"#"}>교육과정</Link>
          </li>
          <li>
            <Link to={"/Team"}>팀소개</Link>
          </li>
          <li>
            <Link to={"/ClassWrite"}>강의실/과목</Link>
          </li>
          <li>
            <Link to={"/TestWrite"}>테스트</Link>
          </li>
        </ul>
      </div>

      <div className={style.right_container}>
        <ul>
          <li>
            {loginOk ? (
              <Link to={"/DashBoard"}>대쉬보드</Link>
            ) : (
              <Link to={"/Login"}>로그인</Link>
            )}
          </li>
          <li>
            {loginOk ?
              <Image
                src={userpic}
                alt="프로필 미리보기"
                roundedCircle
              /> :
              <Link to={"/Join"}>회원가입</Link>
            }
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
