import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import style from "../SCSS/pages/_testSetList.module.scss";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Profile from "../components/Profile";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.get(`${baseUrl}/CodeBridge/test/getall`);
      setTestList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTestList();
  }, []);

  // testList 난이도별로 분류
  const categorizeTestsByLevel = (tests) => {
    const levelTests = [[], [], [], []];
    tests.forEach((test) => {
      levelTests[test.test_level].push(test);
    });
    return levelTests;
  };

  const [dummy, level1Tests, level2Tests, level3Tests] = categorizeTestsByLevel(testList);
  const [selectedTestNums, setSelectedTestNums] = useState([]);

  // 모달 관련
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (item) => {
    setSelectedTest(item);
    setShow(true);
  };

  // 테스트번호 저장하고 해당 item 색 변경
  const handleItemClick = (item) => {
    const { test_num } = item;
    setSelectedTestNums((prevSelectedTestNums) => {
      if (prevSelectedTestNums.includes(test_num)) {
        return prevSelectedTestNums.filter((num) => num !== test_num);
      } else {
        return [...prevSelectedTestNums, test_num];
      }
    });
  };

  const [selectedTest, setSelectedTest] = useState(null); // 선택된 문제 정보 상태 추가


  const navigate = useNavigate();
  // 고른 문제 출제하기
  const subTestList = async () => {

    if (selectedTestNums.length === 0) {
      alert("선택한 과목이 없습니다. 과목을 선택해주세요.");
      return;
    }

    const selectedTestNumsString = selectedTestNums.join(",");
    let obj = {
      sub_num: parseInt(sub_num),
      test_num: selectedTestNums,
    };
    try {
      const res = await axios.post(
        `${baseUrl}/CodeBridge/subjecTtest/submit`,
        obj
      );
      if (res.data == "success") {
        alert('출제 완료')
        navigate("/DashAdmin");
      } else {
        alert('출제 실패')
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Profile />

        <div className={style.right_container_list}>
          <div className={style.right_container_list_button}>
            <h4>1주차 교과목타이틀</h4>
            <button
              type="button"
              className={style.sub_btn}
              onClick={subTestList}
            >
              출제하기
            </button>
          </div>
          <div className={style.right_container_list_grid}>
            <div className={style.right_container_list_grid_box}>
              <h5>Level 하</h5>
              {level1Tests.map((item, index) => (
                <div
                  key={index}
                  className={`${style.test_list_item_wrapper} ${selectedTestNums.includes(item.test_num)
                    ? style.selected
                    : ""
                    }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span>{item.test_title}</span>
                  <div
                    onClick={() => handleShow(item)}
                    className={style.test_list_item_wrapper_level}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className={style.right_container_list_grid_box}>
              <h5>Level 중</h5>
              {level2Tests.map((item, index) => (
                <div
                  key={index}
                  className={`${style.test_list_item_wrapper} ${selectedTestNums.includes(item.test_num)
                    ? style.selected
                    : ""
                    }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span>{item.test_title}</span>
                  <div
                    onClick={() => handleShow(item)}
                    className={style.test_list_item_wrapper_level}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className={style.right_container_list_grid_box}>
              <h5>Level 상</h5>
              {level3Tests.map((item, index) => (
                <div
                  key={index}
                  className={`${style.test_list_item_wrapper} ${selectedTestNums.includes(item.test_num)
                    ? style.selected
                    : ""
                    }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span>{item.test_title}</span>
                  <div
                    onClick={() => handleShow(item)}
                    className={style.test_list_item_wrapper_level}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose} style={{ top: "55%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 99999 }}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedTest && selectedTest.test_title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>문제 내용</h5>
            <p>{selectedTest && selectedTest.test_description}</p>
            <h5>제한 조건</h5>
            <div>
              {selectedTest &&
                selectedTest.test_condition.split('brbr').map((testCase, index) => (
                  <p key={index}>{testCase}</p>
                ))}
            </div>
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
