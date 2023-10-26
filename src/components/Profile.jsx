import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../SCSS/pages/_profile.module.scss";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";

const Profile = ({ showEditButton }) => {
  // redux 값 뺴오기
  const combinedInfo = useSelector(state => state.combinedInfo);

  const [userInfo, setUserInfo] = useState([]);
  const [classInfo, setClassInfo] = useState([]);

  console.log('profile 유저인포 확인', userInfo);

  useEffect(() => {
    setUserInfo(combinedInfo.userInfo)
    setClassInfo(combinedInfo.classInfo)
  }, [combinedInfo]);

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
          <br />님 환영합니다.
        </p>
      </div>

      {classInfo ?
        <h1>{classInfo.class_title}</h1>
        :
        <h1>아직 담당 반 없음</h1>
      }


    </div>
  );
};

export default Profile;
