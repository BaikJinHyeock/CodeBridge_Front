import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import style from "../SCSS/pages/_testSetList.module.scss";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Title from "./Title";
import Profile from "./Profile";
import axios from 'axios';
import { useLocation } from "react-router";


const TestList = () => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sub_num = params.get("sub_num");


  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [testList, setTestList] = useState([]);

  // 시험목록 긁어오기
  const getTestList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/CodeBridge/Test/getall`);
      setTestList(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTestList();
  }, []);


  // testList 난이도별로 분류
  const categorizeTestsByLevel = (tests) => {
    const levelTests = [[], [], []];
    tests.forEach(test => {
      levelTests[test.test_level].push(test);
    });
    return levelTests;
  }

  const [level0Tests, level1Tests, level2Tests] = categorizeTestsByLevel(testList);
  const [selectedTestNums, setSelectedTestNums] = useState([]);

  // 모달 관련
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }

  const handleShow = (item) => {
    setSelectedTest(item);
    setShow(true);
  };


  // 테스트번호 저장하고 해당 item 색 변경
  const handleItemClick = (item) => {
    const { test_num } = item;
    setSelectedTestNums(prevSelectedTestNums => {
      if (prevSelectedTestNums.includes(test_num)) {
        return prevSelectedTestNums.filter(num => num !== test_num);
      } else {
        return [...prevSelectedTestNums, test_num];
      }
    });
  };


  const [selectedTest, setSelectedTest] = useState(null); // 선택된 문제 정보 상태 추가

  // 고른 문제 출제하기
  const subTestList = async () => {
    const selectedTestNumsString = selectedTestNums.join(',');
    let obj = {
      sub_num: parseInt(sub_num),
      test_num: selectedTestNums
    };
    console.log('obj 확인', obj);
    try {
      const response = await axios.post(`${baseUrl}/CodeBridge/SubjecTtest/submit`, obj);
    } catch (error) {
      console.error(error);
    }
  }

  console.log('번호 확인', selectedTestNums);


  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Title pageName="테스트" />
        <Profile showEditButton={false} />
      </div>

      <div className={style.test_list_wrapper}>
        <p>1주차 Java</p>
        <div>
          <h4>Level 하</h4>
          {level0Tests.map((item, index) => (
            <div
              key={index}
              className={`${style.test_list_item_wrapper} ${selectedTestNums.includes(item.test_num) ? style.selected : ""
                }`}
              onClick={() => handleItemClick(item)}
            >
              <div>
                <p>{item.test_title}</p>
              </div>
              <div onClick={() => handleShow(item)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>
          ))}

          <h4>Level 중</h4>
          {level1Tests.map((item, index) => (
            <div
              key={index}
              className={`${style.test_list_item_wrapper} ${selectedTestNums.includes(item.test_num) ? style.selected : ""
                }`}
              onClick={() => handleItemClick(item)}
            >
              <div>
                <p>{item.test_title}</p>
              </div>
              <div onClick={handleShow}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>
          ))}

          <h4>Level 상</h4>
          {level2Tests.map((item, index) => (
            <div
              key={index}
              className={`${style.test_list_item_wrapper} ${selectedTestNums.includes(item.test_num) ? style.selected : ""
                }`}
              onClick={() => handleItemClick(item)}
            >
              <div>
                <p>{item.test_title}</p>
              </div>
              <div onClick={handleShow}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>
          ))}

          <div className={style.sub_btn} onClick={subTestList}>
            출제하기
          </div>

        </div>

        <Modal show={show} onHide={handleClose} style={{ top: '20%' }}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedTest && selectedTest.test_title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>문제 내용</h5>
            <p>{selectedTest && selectedTest.test_contents}</p>
            <h5>제한 조건</h5>
            <div
              dangerouslySetInnerHTML={{ __html: selectedTest && selectedTest.test_condition }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default TestList;
