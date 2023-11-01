import React, { useEffect, useState } from "react";
import style from "../SCSS/pages/_classRoom.module.scss";
import LiveChatTest from "../components/LiveChatTest";
import axios from 'axios';
import { useSelector } from "react-redux";

export const ClassRoom = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // redux 값 뺴오기
  const combinedInfo = useSelector(state => state.combinedInfo);

  const [userInfo, setUserInfo] = useState([]);
  const [classInfo, setClassInfo] = useState([]);

  // console.log('클래스룸 에서 유저인포', userInfo);
  // console.log('클래스룸 에서 classInfo', classInfo);


  useEffect(() => {
    setUserInfo(combinedInfo.userInfo)
    setClassInfo(combinedInfo.classInfo)
  }, [combinedInfo]);



  useEffect(() => {
    getStuList();
  }, [classInfo])

  const [stuList, setStuList] = useState([]);

  // 반 학생 리스트 긁어오기
  const getStuList = async () => {
    console.log('반번호 ? ', classInfo.class_num);
    try {
      const res = await axios.get(`${baseUrl}/CodeBridge/class/getClassStu?class_num=${classInfo.class_num}`);
      console.log('받아온 학생 리스트 확인', res.data);
      setStuList(res.data)
    } catch (error) {
    }
  }



  // 학생 정보 컴포넌트
  const StudentItem = ({ props }) => {
    const handleOpenLink = () => {
      window.open('http://59.0.249.27:8071', '_blank');
    }

    return (
      <div>
        <div>
          학생이름 :  <span onClick={handleOpenLink} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{props.user_name}</span>
        </div>
      </div >
    );
  }

  return (
    <div className={style.main_container}>
      {userInfo.user_type == 0 ?
        <div className={style.left_container_wrapper}>
          <iframe src={`${userInfo.server_url}`}></iframe>
        </div>
        :
        <div className={style.left_container_wrapper}>
          {stuList.map((item, index) =>
            <StudentItem key={index} props={item} />
          )}
        </div>
      }
      {/* <iframe src="http://59.0.249.27:8071/"></iframe> */}
      <div className={style.main_container_right}>
        <div className={style.main_container_right_buttons}>
          <button type="button">화면공유</button>
          <button type="button">도움요청</button>
        </div>
        <div className={style.main_container_right_chat}>
          <LiveChatTest />
        </div>
      </div>
    </div>
  );
};

export default ClassRoom;
