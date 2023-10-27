import React, { useState } from "react";
import Profile from "../components/Profile";
import style from "../SCSS/pages/_markDetail.module.scss";
import Image from "react-bootstrap/Image";
import axios from "axios";

const MarkDetail = () => {
  const markSubmit = async (e) => {
    e.preventDefault();
    let subTest = {
      test_num: "1, 2, 3",
      user_id: "admin@naver.com",
    };

    console.log("subTest확", subTest);

    const response = await axios.post(
      "http://localhost:8085/CodeBridge/Test/mark",
      subTest
    );

    console.log("response확", response);

    /* const mark_code_list = response.data;
        console.log('리스트 확인 ', mark_code_list); */

    /*         for (let mark_code of mark_code_list) {
                    console.time("걸린시간")
                    const response_py = await axios.post("http://127.0.0.1:5000/", mark_code);
                    console.log('파이썬 응답 확인', response_py.data);
                    console.timeEnd("걸린시간")
                } */
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
