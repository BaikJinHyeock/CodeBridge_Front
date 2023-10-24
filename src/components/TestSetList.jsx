import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import style from "../SCSS/pages/_testSetList.module.scss";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Title from "./Title";
import Profile from "./Profile";
import axios from 'axios';


const TestList = () => {

  const [selectedTest, setSelectedTest] = useState(null);

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [testList, setTestList] = useState([]);

  // 시험목록 긁어오기
  const getTestList = async (e) => {
    await axios.get(`${baseUrl}/CodeBridge/Test/getall`)
      .then(response => {
        console.log('response확인', response.data);
        setTestList(response.data)
      }).catch(error => {
        console.error(error);
      })
  }

  useEffect(() => {
    getTestList();
  }, []);

  const level0Tests = [];
  const level1Tests = [];
  const level2Tests = [];


  // testList 배열을 순회하면서 레벨별로 분류
  testList.forEach(test => {
    if (test.test_level === 0) {
      level0Tests.push(test);
    } else if (test.test_level === 1) {
      level1Tests.push(test);
    } else if (test.test_level === 2) {
      level2Tests.push(test);
    }
  });

  // 모달 관련
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 모달 관련

  const TestItem = () => {
    return (
      <div className={style.test_item_wrapper}>
        <div>
          <span>1주차</span>
          <span>Java</span>
        </div>
        <div className={style.test_item_btn}>문제 출제</div>
      </div>
    );
  };

  const TestListItem = (props) => {
    const handleShow = () => {
      setSelectedTest(props.props); // 클릭된 항목을 선택하도록 수정
      setShow(true); // 모달을 열도록 수정
    };
    return (
      <div className={style.test_list_item_wrapper}>
        <div>
          <p>{props.props.test_title}</p>
        </div>
        <div onClick={handleShow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Title pageName="테스트" />
        <Profile showEditButton={false} />
      </div>

      <div className={style.test_list_wrapper}>
        <p>1주차 Java</p>

        {level0Tests.length > 0 && (
          <div>
            <h4>Level 하</h4>
            {level0Tests.map(item => <TestListItem key={item.id} props={item} />)}
          </div>
        )}

        {level1Tests.length > 0 && (
          <div>
            <h4>Level 중</h4>
            {level1Tests.map(item => <TestListItem key={item.id} props={item} />)}
          </div>
        )}

        {level2Tests.length > 0 && (
          <div>
            <h4>Level 상</h4>
            {level2Tests.map(item => <TestListItem key={item.id} props={item} />)}
          </div>
        )}

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
            <Button variant="primary" onClick={handleClose}>
              문제 선택
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default TestList;
