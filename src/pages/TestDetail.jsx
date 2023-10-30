import React, { useEffect, useState } from "react";
import style from "../SCSS/pages/_testDetail.module.scss";
import CompilerTest from "../components/CompilerTest";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';

const TestDetail = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;


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

  console.log('testList확인', testList);

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
      "http://localhost:8085/CodeBridge/code/submit",
      subTest
    );

    console.log("리스폰스 확인", response);
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

  console.log('점수 확인', test_score);

  const [gptRes, setGptRes] = useState([]);


  const subCodeList = async () => {
    const selectedTest = testList[selectedTestIndex];

    const obj = {
      test_contents: selectedTest.test_description,
      sub_code: subTestCode[selectedTestIndex],
      test_conditions: selectedTest.test_condition
    };
    console.log('obj 확인', obj);

    setIsSubmitDisabled(prevState => {
      const updatedDisabled = [...prevState];
      updatedDisabled[selectedTestIndex] = true;
      return updatedDisabled;
    });

    try {
      const response_py = await axios.post("http://127.0.0.1:5000/", obj);
      console.log('파이썬 응답 확인', response_py.data);
      const updatedGptRes = [...gptRes];
      updatedGptRes[selectedTestIndex] = response_py.data;
      setGptRes(updatedGptRes);

      const testCases = response_py.data.split('테스트케이스');
      let successCount = 0;

      for (let i = 1; i < testCases.length; i++) {
        if (testCases[i].includes('성공')) {
          successCount++;
        }
      }


      const testScore = (successCount > 0)
        ? selectedTest.test_level * 10 * (successCount / (testCases.length - 1))
        : 0;


      setTestScore(prevScores => {
        const updatedScores = [...prevScores];
        updatedScores[selectedTestIndex] = testScore;
        return updatedScores;
      });

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

  console.log('현제 상태 확인', isSubmitDisabled[selectedTestIndex]);

  console.log('지금 인덱스', selectedTestIndex);
  console.log('gpt답변', gptRes);



  return (
    <div className={style.wrap_container}>
      <div className={style.test_list_container}>
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
      <div className={style.test_condition}>

        {testList[selectedTestIndex] &&
          <>
            <div className={style.test_condition_explan}>
              <h4>배점</h4>
              <p>
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
              <ul>
                {testList[selectedTestIndex].test_condition.split(",").map((testCase, index) => (
                  <li key={index}>{testCase.trim()}</li>
                ))}
              </ul>
            </div>
            <textarea
              className="form-control"
              placeholder="Problem description"
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
        {/* <CompilerTest className={style.div_box} submittedCode={recieveCode} /> */}
        <iframe src="http://59.0.234.207:8083/?folder=/home/smhrd/test" />

      </div>
    </div>
  );
};

export default TestDetail;
