import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../SCSS/pages/_profile.module.scss";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";

const Profile = ({ showEditButton }) => {
  const [userInfo, setUserInfo] = useState([]);

  const id = sessionStorage.getItem("memberId");
  useEffect(() => {
    if (id) {
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
    setUserInfo(response.data[0])
  };

  console.log('유저인포 확인', userInfo);

  // redux 값 뺴오기
  const classInfo = useSelector(state => state.classInfo);

  console.log('프로필에서 클래스인포 확인', classInfo);



  return (
    <div className={style.profile_box}>
      <div className={style.profile_box_after}>
        <div className={style.profile_wrap_container}>
          <div className={style.profile_img}>
            <Image
              src={userInfo.user_pic}
              alt="프로필 미리보기"
              roundedCircle
            />
          </div>

          {showEditButton && (
            <div className={style.profile_img_edit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="white"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </div>
          )}
        </div>
        <p>
          <span>{userInfo.user_name}</span>
          {/* <span>선동욱</span> */}
          <br />님 환영합니다.
        </p>
      </div>
      <h1>{classInfo.class_title}</h1>
    </div>
  );
};

export default Profile;
