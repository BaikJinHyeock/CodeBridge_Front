import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import style from "../SCSS/pages/_markList.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const MarkList = () => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const class_num = params.get("class_num");


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
      const res = await axios.get(`${baseUrl}/CodeBridge/sub/getsub?class_num=${class_num}`);
      setSubList(res.data); // 데이터를 상태에 저장
    } catch (error) {
      console.error(error);
    }
  };

  // 총점 가져오기
  const getTotalScore = async () => {
    try {
      const res = await axios.get(`${baseUrl}/CodeBridge/sub/total-score?class_num=${class_num}`);
      setTotalScoreList(res.data)
    } catch (error) {
      console.error(error);
    }
  }


  // 과목별 학생 성적 가져오기
  const getStudentScore = async () => {
    let obj = {
      class_num: class_num,
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
  }, []);


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





  const SetTestList = ({ props }) => {
    const cliclListItem = () => {
      handleShow(props.sub_num)
    }

    return (
      <div className={style.item} onClick={cliclListItem}>
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


  // 모달 관련
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (sub_num) => {
    getMarkResult(sub_num);
    setShow(true);
  };

  const [detailMarkResult, setDetailMarkResult] = useState([]);

  const getMarkResult = async (sub_num) => {
    let obj = {
      sub_num: sub_num,
      user_id: sessionStorage.getItem("memberId")
    }
    try {
      const res = await axios.post(`${baseUrl}/CodeBridge/mark/detail-mark-result`, obj);
      setDetailMarkResult(res.data)
    } catch (error) {

    }
  }


  const MarkDetailItem = ({ props, index }) => {

    return (
      <div className={style.detail_mark_box}>
        <p>문제 설명</p>
        <p>{props.test_description}</p>
        <p>제출한 코드</p>
        <div className={style.sub_code_box}>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{props.sub_code}</pre>
        </div>
        <p>채점 결과</p>
        <div className={style.mark_result_box}>
          {props.mark_result.split('\n').map((line, index) => (
            <div key={index}>
              {line.includes('성공') ? (
                <div><span style={{ color: 'blue' }}>{line}</span></div>
              ) : line.includes('실패') ? (
                <div><span style={{ color: 'red' }}>{line}</span></div>
              ) : (
                <div>{line}</div>
              )}
            </div>
          ))}
        </div>
        <hr />
      </div>
    )
  }




  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Profile />
        <div className={style.right_container_grid_box}>
          {userInfo.user_type == 1 ? (
            <h4>과목별 채점하기</h4>
          ) : (
            <h4>과목별 점수보기</h4>
          )}
          <div className={style.right_container_grid_box_detail}>
            {combinedArray.map((item, index) =>
              <SetTestList key={index} props={item} />
            )}
          </div>

          <Modal show={show} onHide={handleClose} style={{ top: "55%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 99999 }}>
            <Modal.Header closeButton>
              <Modal.Title>채점 결과</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {detailMarkResult.map((item, index) =>
                <MarkDetailItem key={index} props={item} />
              )}


            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                닫기
              </Button>
            </Modal.Footer>
          </Modal>



        </div>
      </div>
    </div>
  );
};

export default MarkList;
