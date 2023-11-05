import React, { useState } from "react";
import Profile from "../components/Profile";
import style from "../SCSS/pages/_markDetail.module.scss";
import Image from "react-bootstrap/Image";
import axios from "axios";

const MarkDetail = () => {

    // 스프링 주소
    const baseUrl = process.env.REACT_APP_BASE_URL;

  const markSubmit = async (e) => {
    e.preventDefault();
    let subTest = {
      test_num: "1, 2, 3",
      user_id: "admin@naver.com",
    };


    const response = await axios.post(
      `${baseUrl}/CodeBridge/test/mark`,
      subTest
    );


  };

  const MarkItenm = () => {
    return (
      <div className={style.item}>
        <div>
          <h5>선동욱</h5>
          <span>A</span>
        </div>
        <button className={style.before_button} onClick={markSubmit}>
          채점하기
        </button>
      </div>
    );
  };

  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Profile />
        <div className={style.right_container_grid_box}>
          <h4>채점 현황</h4>
          <div className={style.right_container_grid_box_detail}>
            <MarkItenm />
            <MarkItenm />
            <MarkItenm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkDetail;
