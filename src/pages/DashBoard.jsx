import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import DashRightBox from "../components/DashRightBox";
import style from "../SCSS/pages/_dashBoard.module.scss";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { updateClassInfo } from "../actions/classInfoActions";
import { updateTeacherInfo } from "../actions/teacherInfoActions";

const DashBoard = () => {

  // redux 설정
  const dispatch = useDispatch();
  const [classInfo, serClassInfo] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState([]);

  // redux 값 뺴오기
  const userInfo = useSelector(state => state.userInfo);

  useEffect(() => {

    // classInfo를 Redux로 설정
    dispatch(updateClassInfo(classInfo));
    // teacherInfo를 Redux로 설정
    dispatch(updateTeacherInfo(teacherInfo));
  }, [dispatch, classInfo, teacherInfo]);
  // redux 설정

  // 모든 정보 조회
  const id = sessionStorage.getItem("memberId");

  const CurriList = () => {
    return (
      <div className={style.curriList_item}>
        <div>
          <span>3주차</span>
        </div>
        <div>
          <span>IoT 센싱 및 데이터수집</span>
        </div>
      </div>
    );
  };

  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        {/* <Title pageName="Dash Board" /> */}
        <Profile />

        <div className={style.main_content}>
          <div className={style.main_content_left}>
            <h4>커리큘럼</h4>
            <div className={style.main_content_left_curriList}>
              <CurriList />
              <CurriList />
              <CurriList />
              <CurriList />
            </div>
          </div>

          <div className={style.main_content_right}>
            <h4>To do List</h4>
          </div>
        </div>
      </div>
      <DashRightBox />
    </div>
  );
};

export default DashBoard;
