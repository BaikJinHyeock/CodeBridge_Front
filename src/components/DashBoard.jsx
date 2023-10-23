import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import DashRightBox from "./DashRightBox";
import style from "../SCSS/pages/_dashBoard.module.scss";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../actions/userInfoActions";
import { updateClassInfo } from "../actions/classInfoActions";
import { updateTeacherInfo } from "../actions/teacherInfoActions";

const DashBoard = () => {

  // redux 설정
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState([]);
  const [classInfo, serClassInfo] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState([]);




  useEffect(() => {
    // userInfo를 Redux로 설정
    dispatch(updateUserInfo(userInfo));
    // classInfo를 Redux로 설정
    dispatch(updateClassInfo(classInfo));
    // teacherInfo를 Redux로 설정
    dispatch(updateTeacherInfo(teacherInfo));
  }, [dispatch, userInfo, classInfo, teacherInfo]);
  // redux 설정

  // 모든 정보 조회
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
    await axios.post(
      "http://localhost:8085/CodeBridge/Member/memcheck",
      mem
    )
      .then(response => {
        console.log('로그인 응답확인', response.data);
        setUserInfo(response.data[0])
      })
      .catch(error => {
        console.error(error);
      })
  };

  // 반 번호로 반 정보 조회
  useEffect(() => {
    console.log('반번호 확인', userInfo.class_num);
    let obj = {
      class_num: userInfo.class_num
    }
    axios.post(`http://localhost:8085/CodeBridge/Class/findnum`, obj)
      .then(response => {
        console.log('응답 확인', response.data[0]);
        serClassInfo(response.data[0]);
      })
      .catch(error => {
        console.error(error);
      })
  }, [userInfo]);

  // 반 정보 아이디로 선생님 정보조회
  useEffect(() => {
    console.log('선생아이디', classInfo.user_id);
    let obj = {
      user_id: classInfo.user_id
    }
    axios.post(`http://localhost:8085/CodeBridge/Member/memberInfoTeacher`, obj)
      .then(response => {
        console.log('선생정보', response.data[0]);
        setTeacherInfo(response.data[0]);
      })
      .catch(error => {
        console.error(error);
      })
  }, [classInfo]);


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
