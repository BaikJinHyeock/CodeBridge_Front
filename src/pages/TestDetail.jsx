import React, { useEffect, useState } from "react";
import style from "../SCSS/pages/_testDetail.module.scss";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from "react-redux";

const TestDetail = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const pyUrl = process.env.REACT_APP_PY_URL;

  // redux 값 뺴오기
  const combinedInfo = useSelector(state => state.combinedInfo);

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    setUserInfo(combinedInfo.userInfo)
  }, [combinedInfo]);

  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sub_num = params.get("sub_num");


  const [testList, SetTestList] = useState([]);
  const [testcontents, setTestcontents] = useState("");
  const [condition, setTestCondition] = useState("");
  const [selectedTestIndex, setSelectedTestIndex] = useState(null);

  const getTestList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/CodeBridge/test/detail?sub_num=${sub_num}`);
      SetTestList(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getTestList();
  }, []);

  useEffect(() => {
    // testList가 존재하고, 길이가 0보다 큰 경우에만 selectall 호출
    if (testList && testList.length > 0) {
      selectall(0);
    }
  }, [testList]);
  const [testCode, setTestCode] = useState("");

  const recieveCode = (code) => {
    setTestCode(code); // CompilerTest에서 전달된 코드를 TestDetail에서 받아와서 상태를 설정
  };


  const submitButton = async (e) => {
    e.preventDefault();
    let subTest = {
      test_num: 5,
      user_id: sessionStorage.getItem("memberId"),
      sub_code: testCode,
    };
    const response = await axios.post(
      `${baseUrl}/CodeBridge/code/submit`,
      subTest
    );

  };

  const selectall = (index) => {
    setTestcontents(testList[index].test_contents);
    setTestCondition(testList[index].test_condition);
    setSelectedTestIndex(index);
  };

  const [subTestCode, setSubTestCode] = useState([]);



  const updateSubTestCode = (index, code) => {
    const updatedCode = [...subTestCode];
    updatedCode[index] = code;
    setSubTestCode(updatedCode);
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(testList.map(() => false));

  // 체점관련

  const [test_score, setTestScore] = useState([]);


  const [gptRes, setGptRes] = useState([]);


  const subCodeList = async () => {
    const selectedTest = testList[selectedTestIndex];

    const obj = {
      test_contents: selectedTest.test_description,
      sub_code: subTestCode[selectedTestIndex],
      test_conditions: selectedTest.test_condition
    };

    setIsSubmitDisabled(prevState => {
      const updatedDisabled = [...prevState];
      updatedDisabled[selectedTestIndex] = true;
      return updatedDisabled;
    });
    console.time('채점시간')
    try {
      const response_py = await axios.post(`${pyUrl}/mark`, obj);
      const updatedGptRes = [...gptRes];
      updatedGptRes[selectedTestIndex] = response_py.data;
      setGptRes(updatedGptRes);
      console.timeEnd("채점시간")
      const testCases = response_py.data.split('테스트케이스');
      let successCount = 0;

      for (let i = 1; i < testCases.length; i++) {
        if (testCases[i].includes('성공')) {
          successCount++;
        }
      }

      const testScore = (successCount > 0)
        ? (selectedTest.test_level * 10 * (successCount / (testCases.length - 1))).toFixed(1)
        : 0;

      setTestScore(prevScores => {
        const updatedScores = [...prevScores];
        updatedScores[selectedTestIndex] = testScore;
        return updatedScores;
      });


      let mark_result = {
        sub_num: sub_num,
        test_num: selectedTest.test_num,
        user_id: sessionStorage.getItem("memberId"),
        sub_code: subTestCode[selectedTestIndex],
        mark_result: response_py.data,
        mark_score: testScore
      }

      const response = await axios.post(`${baseUrl}/CodeBridge/mark/result`, mark_result);

    } catch (error) {
      console.error(error);
    }
  };



  // 모달 관련
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (item) => {
    const confirmSubmit = window.confirm("제출할 경우 더이상 수정이 불가능합니다");

    if (confirmSubmit) {
      setShow(true);
      subCodeList();
    }
  };

  const realhandleShow = (item) => {
    setShow(true);
  };

  const finalSubmit = async () => {
    const confirmSubmit = window.confirm("정말 종료하시겠습니까?");

    if (!confirmSubmit) {
      return;
    }
    let obj = {
      sub_num: sub_num,
      user_id: sessionStorage.getItem("memberId")
    }
    try {
      const res = await axios.post(`${baseUrl}/CodeBridge/mark/submit`, obj);
      if (res.data == "success") {
        alert("제출완료")
        navigate("/DashBoard")
      } else {
        alert("제출실패")
      }

    } catch (error) {

    }
  }

  return (
    <>
      <div className={style.wrap_container}>
        <div className={style.test_list_container}>
          <div>
            {testList.map((test, index) => (
              <div key={index}>
                <div
                  onClick={() => selectall(index)}
                  className={`${style.test_list_container_item} ${selectedTestIndex === index ? style.active : ""
                    }`}
                >
                  {`${index + 1}번 문제`}
                </div>
              </div>
            ))}
          </div>
          <div>
            <button onClick={finalSubmit} className={style.final_submit_btn}>
              시험종료
            </button>
          </div>
        </div>
        <div className={style.test_condition}>

          {testList[selectedTestIndex] &&
            <>
              <div className={style.test_condition_explan}>
                <h4>배점</h4>
                <p className={style.score_ptag}>
                  {testList[selectedTestIndex].test_level === 1 ? "10" :
                    testList[selectedTestIndex].test_level === 2 ? "20" :
                      testList[selectedTestIndex].test_level === 3 ? "30" : ""}
                  점
                </p>
                <p>맞춘 제한사항에 비례하여 점수가 부여됩니다</p>
              </div>
              <div className={style.test_condition_explan}>
                <h4>문제설명</h4>
                <p>{testList[selectedTestIndex].test_description}</p>
              </div>
              <div className={style.test_condition_explan}>
                <h4>제한사항</h4>
                <p className={style.condition_ptag}>
                  {testList[selectedTestIndex].test_condition.split('brbr').map((testCase, index) => (
                    <span key={index}>{testCase.trim()}<br /></span>
                  ))}
                </p>
              </div>
              <textarea
                className={style.sub_code_area}
                placeholder="답안 입력"
                value={subTestCode[selectedTestIndex] || ''}
                onChange={(e) => updateSubTestCode(selectedTestIndex, e.target.value)}
              />
              <button
                className={`${style.code_sub_btn} ${isSubmitDisabled[selectedTestIndex] ? style.disabled : ""}`}
                onClick={() => handleShow(selectedTestIndex)}
                disabled={isSubmitDisabled[selectedTestIndex]} // 이 부분을 추가하세요
              >
                제출하기
              </button>
              <button
                className={style.check_result_btn}
                onClick={() => realhandleShow(selectedTestIndex)}
                disabled={!isSubmitDisabled[selectedTestIndex]}
              >
                결과확인
              </button>


              <Modal show={show} onHide={handleClose} style={{ top: "55%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 99999 }}>
                <Modal.Header closeButton>
                  <Modal.Title>채점 결과</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {gptRes[selectedTestIndex] == null ? (
                    <Button variant="primary" disabled>
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span> </span>채점중...
                    </Button>
                  ) : (
                    <div>
                      {gptRes[selectedTestIndex].split('\n').map((line, index) => (
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
                      <p>획득 점수 : {test_score[selectedTestIndex]}</p>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    닫기
                  </Button>
                </Modal.Footer>
              </Modal>


            </>
          }

        </div>
        <div className={style.test_compiler}>
          <iframe src={`${userInfo.server_url}?folder=/home/smhrd/test/TestRoom`}></iframe>
        </div>
      </div>

      <div className={style.mobile}>
        <div>
          <h1>웹 해상도에서만 서비스 제공 중</h1>
          <p>
            죄송합니다. 현재 CodeBridge 서비스는 모바일 해상도에서 이용할 수 없습니다.
            데스크탑에서 접속해주시기 바랍니다.
          </p>
        </div>
      </div>
    </>
  );
};

export default TestDetail;
