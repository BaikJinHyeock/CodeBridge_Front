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
  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

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
    setIsProfileVisible(!isProfileVisible);
  };

  const logOut = () => {
    sessionStorage.removeItem("memberId");
    setIsProfileVisible(!isProfileVisible);
    window.location.href = "/";
  };
  const toggleProfile = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  useEffect(() => {
    memberSearching();
    isClassed();
  }, []);

  // 회원정보 조회
  const memberSearching = async () => {
    let mem = {
      user_id: id,
    };
    await axios.post(`${baseUrl}/CodeBridge/member/memcheck`, mem)
      .then((response) => {
        setUserInfo(response.data[0]);
        axios.get(`${baseUrl}/CodeBridge/class/findnum?class_num=${response.data[0].class_num}`)
          .then((response) => {
            setClassInfo(response.data[0]);
            axios.get(`${baseUrl}/CodeBridge/member/memberInfoTeacher?user_id=${response.data[0].user_id}`)
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

  console.log('네비 유저정보 확인', userInfo);

  const [isClass, setIsClass] = useState();

  // 반 있는지 확인
  const isClassed = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/CodeBridge/class/findbyid?user_id=${id}`
      );
      console.log("결과 ", response.data);
      setIsClass(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  // 사이드바 작동 토글
  const [active, setAtive] = useState(true);
  const toggleActive = () => {
    setAtive(!active);
  };

  return (
    <>
      <div className={style.Wrap_container}>
        <div className={style.left_container}>
          <Link to={"/"}>
            <div className={style.logo_wrapper}>
              <div className="image-component sc-htpNat enshqJ">
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
          <ul className={style.nomal}>
            {id ? (
              <li className={style.right_container_profile_text}>
                {isClass || userInfo.hasclass ? (
                  <li className={style.right_container_profile_text}>
                    <Link to={"/DashBoard"}>대시보드</Link>
                  </li>
                ) : (
                  <li>
                    <button onClick={() => alert("반이 없습니다")}>
                      대시보드
                    </button>
                  </li>
                )}
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
                <button
                  type="button"
                  className={style.button_logout}
                  onClick={logOut}
                >
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
      <div
        className={active ? style.mobile : `${style.mobile} ${style.activeBg}`}
      >
        <div className={style.mobile_wrap_container}>
          <Link to={"/"}>
            <h1>Code Bridge</h1>
          </Link>
          <ul className={style.mobile_wrap_container_right}>
            <li onClick={toggleActive}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </li>
          </ul>
        </div>
        <div
          className={
            active
              ? `${style.mobile_silde_container} ${style.active}`
              : style.mobile_silde_container
          }
        >
          <div className={style.mobile_silde_container_first}>
            {id ? (
              <div className={style.mobile_silde_container_first_profile}>
                <div className={style.mobile_silde_container_first_profile_img}>
                  <Image
                    src={userInfo.user_pic}
                    alt="프로필 미리보기"
                    roundedCircle
                  />
                </div>
                <div className={style.mobile_silde_container_first_text}>
                  <h5>{userInfo.user_name}</h5>
                  <span>{id}</span>
                </div>
              </div>
            ) : (
              <div className={style.mobile_silde_container_first_before}>
                <Link to={"/Login"}>
                  <h4>로그인/회원가입</h4>
                  <p>로그인 후 서비스를 이용하실 수 있습니다.</p>
                </Link>
              </div>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-x"
              viewBox="0 0 16 16"
              onClick={toggleActive}
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>

          <div className={style.mobile_silde_container_second}>
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

          {id ? (
            <div className={style.mobile_silde_container_third}>
              {/* 로그인 완료 */}
              <div className={style.mobile_silde_container_third_division}>
                <Link to={"/DashBoard"}>대시보드</Link>
              </div>
              <div className={style.mobile_silde_container_third_buttons}>
                <button
                  type="button"
                  className={style.button_logout}
                  onClick={logOut}
                >
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
          ) : (
            <div className={style.mobile_silde_container_third}>
              {/* 로그인 미완료 */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
