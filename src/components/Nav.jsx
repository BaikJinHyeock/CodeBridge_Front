import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../SCSS/pages/_nav.module.scss";
import axios from "axios";
import Image from "react-bootstrap/Image";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../actions/userInfoActions";
import { updateClassInfo } from "../actions/classInfoActions";
import { updateTeacherInfo } from "../actions/teacherInfoActions";
import { updateAllInfo } from "../actions/updateAllInfo";

const Nav = () => {


  // 로그인했으면 상단 로그인,회원가입변경
  const id = sessionStorage.getItem("memberId");

  const [userInfo, setUserInfo] = useState([]);
  const [classInfo, setClassInfo] = useState([]);
  // 반 정보 아이디로 선생님 정보조회
  const [teacherInfo, setTeacherInfo] = useState([]);

  // 토글 프로필 로그아웃, 정보수정이동
  const navigate = useNavigate();
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const moveSetInfo = () => {
    navigate("/SetInfo");
  };

  const logOut = () => {
    sessionStorage.removeItem("memberId");
        window.location.href = "/";
  };
  const toggleProfile = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  useEffect(() => {
    memberSearching();
  }, []);

  // 회원정보 조회
  const memberSearching = async () => {
    let mem = {
      user_id: id,
    };
    await axios
      .post(`http://localhost:8085/CodeBridge/Member/memcheck`, mem)
      .then((response) => {
        setUserInfo(response.data[0]);
        let obj = {
          class_num: response.data[0].class_num,
        };
        axios
          .post(`http://localhost:8085/CodeBridge/Class/findnum`, obj)
          .then((response) => {
            setClassInfo(response.data[0]);
            let obj = {
              user_id: response.data[0].user_id,
            };
            axios
              .post(
                `http://localhost:8085/CodeBridge/Member/memberInfoTeacher`,
                obj
              )
              .then((response) => {
                setTeacherInfo(response.data[0]);
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log("유저이;ㄴ포 확인", userInfo);

  const dispatch = useDispatch();
  useEffect(() => {
    // 리덕스 설정 함수 호출
    updateReduxState();
  }, [userInfo, classInfo, teacherInfo]);

  const updateReduxState = () => {
    const combinedInfo = {
      userInfo,
      classInfo,
      teacherInfo,
    };

    dispatch(updateAllInfo(combinedInfo)); // 새로운 액션을 디스패치
  };

  return (
    <div className={style.Wrap_container}>
      <div className={style.left_container}>
        <Link to={"/"}>
          <div className={style.logo_wrapper}>
            <div className="image-component sc-htpNat enshqJ">
              <div className="sc-bxivhb fPcvdL">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xlinkHref="http://www.w3.org/1999/xlink"
                  xmlnsSvgjs="http://svgjs.com/svgjs"
                  width="100%"
                  height="100%"
                  viewBox="4.165999889373779 16.71299934387207 87.56563568115234 62.45600128173828"
                >
                  <g fill="#ffffff">
                    <path
                      d="M29.168 58.332h37.5v-4.164h-37.5zm0-28.695c5.184 10.871 11.367 16.195 18.75 16.195 7.383 0 13.566-5.324 18.75-16.195V50h-37.5zm60.414 24.531a2.085 2.085 0 0 0 0-4.168h-18.75V29.637c5.184 10.871 11.367 16.195 18.75 16.195 1.152 0 2.086-.933 2.086-2.082s-.934-2.082-2.086-2.082c-7.297 0-13.641-7.93-18.852-23.578-.652-1.836-3.309-1.836-3.96 0-5.216 15.648-11.56 23.578-18.853 23.578-7.3 0-13.645-7.93-18.855-23.578-.648-1.836-3.309-1.836-3.957 0C19.886 33.738 13.546 41.668 6.25 41.668c-1.148 0-2.082.934-2.082 2.082s.934 2.082 2.082 2.082c7.383 0 13.566-5.324 18.75-16.195V50H6.25a2.084 2.084 0 0 0 0 4.168H25v4.164H6.25a2.085 2.085 0 0 0 0 4.168H25V75h-2.082a2.085 2.085 0 1 0 0 4.168h8.332a2.085 2.085 0 0 0 0-4.168h-2.082V62.5h37.5V75h-2.086a2.084 2.084 0 0 0 0 4.168h8.336a2.085 2.085 0 0 0 0-4.168h-2.086V62.5h18.75a2.085 2.085 0 1 0 0-4.168h-18.75v-4.164z"
                      fillRule="evenodd"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <h1>Code Bridge</h1>
          </div>
        </Link>
        <ul>
          <li>
            <Link to={"#"}>교육과정</Link>
          </li>
          <li>
            <Link to={"/Team"}>팀 소개</Link>
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
          {id ? (
            <li className={style.right_container_profile_text}>
              <a href="/DashBoard">대시보드</a>
              {/* <Link to={"/DashBoard"}>대쉬보드</Link> */}
            </li>
          ) : (
            <li>
              <Link to={"/Login"}>로그인</Link>
            </li>
          )}

          {id ? (
            <li
              className={style.right_container_profile_img}
              onClick={toggleProfile}
            >
              <Image
                src={userInfo.user_pic}
                alt="프로필 미리보기"
                roundedCircle
              />
            </li>
          ) : (
            <li>
              <Link to={"/Join"}>회원가입</Link>
            </li>
          )}
        </ul>
        {isProfileVisible && (
          <div className={style.toggle_box}>
            <div className={style.toggle_box_profile}>
              <div className={style.toggle_box_profile_img}>
                <Image
                  src={userInfo.user_pic}
                  alt="프로필 미리보기"
                  roundedCircle
                />
              </div>
              <div className={style.toggle_box_profile_text}>
                <h5>{userInfo.user_name}</h5>
                <span>{id}</span>
              </div>
            </div>

            <div className={style.toggle_box_buttons}>
              <button type="button" className={style.button_logout} onClick={logOut}>
                로그아웃
              </button>
              <button
                type="button"
                className={style.button_setInfo}
                onClick={moveSetInfo}
              >
                정보수정
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;