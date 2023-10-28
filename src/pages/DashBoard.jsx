import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import DashRightBox from "../components/DashRightBox";
import style from "../SCSS/pages/_dashBoard.module.scss";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { updateClassInfo } from "../actions/classInfoActions";
import { updateTeacherInfo } from "../actions/teacherInfoActions";

const DashBoard = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // redux 값 뺴오기
  const combinedInfo = useSelector(state => state.combinedInfo);

  const [userInfo, setUserInfo] = useState([]);
  const [classInfo, setClassInfo] = useState([]);

  useEffect(() => {
    setUserInfo(combinedInfo.userInfo)
    setClassInfo(combinedInfo.classInfo)
  }, [combinedInfo]);


  const [toarray, setToarray] = useState([]);

  useEffect(() => {
    if (combinedInfo.classInfo && combinedInfo.classInfo.curriculum) {
      const parsedCurriculum = JSON.parse(combinedInfo.classInfo.curriculum);
      setToarray(parsedCurriculum);

      const selectedItems = parsedCurriculum.map(item => item[1]);
      console.log('classSearch에서 아이템:', selectedItems);
      axios.post(`${baseUrl}/CodeBridge/sub/get-sub-list`, selectedItems)
        .then((res) => {
          setsubDetailList(res.data);
        }).catch((error) => {
          console.error();
        })


      console.log('toarray 확인', parsedCurriculum);
    }
  }, [combinedInfo]);






  // 모든 정보 조회
  const id = sessionStorage.getItem("memberId");

  const CurriList = ({ props, index }) => {
    return (
      <div className={style.curriList_item}>
        <div>
          <span>{props[0]}</span>
        </div>
        <div onClick={() => handleSubClick(index)}>
          <span>{props[2]}</span>
        </div>
      </div >
    );
  };


  const [selectedSubIndex, setSelectedSubIndex] = useState(null);

  // 클릭 이벤트 핸들러
  const handleSubClick = (index) => {
    setSelectedSubIndex(index);
  }

  const [subDetailList, setsubDetailList] = useState([]);

  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        {/* <Title pageName="Dash Board" /> */}
        <Profile />

        <div className={style.main_content}>
          <div className={style.main_content_left}>
            <h4>커리큘럼</h4>
            {toarray && toarray.map((item, index) => {
              return (
                <CurriList key={index} props={item} index={index} />
              );
            })}
          </div>

          <div className={style.main_content_right}>
            <h4>To do List</h4>
            {selectedSubIndex !== null && (
              <div>
                <span
                  dangerouslySetInnerHTML={{ __html: subDetailList[selectedSubIndex].sub_content }}></span>
              </div>
            )}
          </div>
        </div>
      </div>
      <DashRightBox />
    </div>
  );
};

export default DashBoard;
