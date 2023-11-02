import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import style from "../SCSS/pages/_markList.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';

const MarkList = () => {


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



  const [subList, setSubList] = useState([]);
  const [totalScoreList, setTotalScoreList] = useState([]);
  const [scoreList, setScoreList] = useState([]);




  // 반 목록 긁어오기
  const getSubs = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/CodeBridge/sub/getsub?class_num=${classInfo.class_num}`
      );
      setSubList(response.data); // 데이터를 상태에 저장
    } catch (error) {
      console.error(error);
    }
  };

  // 총점 가져오기
  const getTotalScore = async () => {
    try {
      const res = await axios.get(`${baseUrl}/CodeBridge/sub/total-score?class_num=${classInfo.class_num}`);
      setTotalScoreList(res.data)
    } catch (error) {
      console.error(error);
    }
  }


  // 과목별 학생 성적 가져오기
  const getStudentScore = async () => {
    let obj = {
      class_num: classInfo.class_num,
      user_id: sessionStorage.getItem("memberId")
    }
    try {
      const res = await axios.post(`${baseUrl}/CodeBridge/mark/markresult`, obj);
      setScoreList(res.data)
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {
    getSubs();
    getTotalScore();
    getStudentScore();
  }, [classInfo]);


  const [combinedArray, setCombinedArray] = useState([]);

  useEffect(() => {
    const combinedArray = [];

    subList.forEach(subItem => {
      const totalScoreItem = totalScoreList.find(item => item.sub_num === subItem.sub_num);
      const scoreItem = scoreList.find(item => item.sub_num === subItem.sub_num);

      const combinedItem = {
        ...subItem,
        score: totalScoreItem ? totalScoreItem.score : null,
        mark_score: scoreItem ? scoreItem.mark_score : null
      };

      combinedArray.push(combinedItem);
    });

    setCombinedArray(combinedArray);
  }, [subList, totalScoreList, scoreList]);

  console.log('combinedArray확인', combinedArray);




  const SetTestList = ({ props }) => {

    return (
      <div className={style.item}>
        <div>
          <h5>{props.sub_title}</h5>
        </div>

        <div>
          {props.mark_score != null ?
            <h5>점수 : {props.mark_score}/{props.score}</h5>
            :
            <h5>UnTested</h5>
          }

        </div>
      </div>
    );
  };



  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Profile />
        <div className={style.right_container_grid_box}>
          <h4>과목별 채점하기</h4>

          <div className={style.right_container_grid_box_detail}>
            {combinedArray.map((item, index) =>
              <SetTestList key={index} props={item} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkList;
