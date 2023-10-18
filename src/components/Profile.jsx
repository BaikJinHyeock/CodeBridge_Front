import React from "react";
import style from "../SCSS/pages/_profile.module.scss";

const Profile = ({ showEditButton }) => {
  return (
    <div className={style.profile_box}>
      <div className={style.profile_box_after}>
        <div className={style.profile_wrap_container}>
          <div className={style.profile_img}>
            <img
              src="https://mblogthumb-phinf.pstatic.net/MjAyMTAzMjJfMjkg/MDAxNjE2Mzg4ODI0NzI5.uBHIwocqtEiKlHbUpds05YCDMe6Arw0o_l-p3PdJFZEg.GqEQvSTGKySHJrOTOE2nLGnlbZx3Cb9xfllMFlCRWdMg.JPEG.chooddingg/PHOTO_0020.JPG?type=w800"
              alt="#"
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
          {/* <span>{username}</span> */}
          <span>선동욱</span>
          <br />님 환영합니다.
        </p>
      </div>
      <h1>데이터디자인 엔지니어 양성과정</h1>
    </div>
  );
};

export default Profile;
