import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import style from "../SCSS/pages/_testSetList.module.scss";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

import Title from "./Title";
import Profile from "./Profile";

// import 'bootstrap/dist/css/bootstrap.min.css';

const TestList = () => {
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

  const TestListItem = () => {
    return (
      <div className={style.test_list_item_wrapper}>
        <div>
          <p>Position 기능 사용하기</p>
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

        <div>
          <h4>Level 하</h4>
          <TestListItem />
          <TestListItem />
          <TestListItem />
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>문제 출제</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>문제 제목</h5>
            <p>주사위</p>
            <h5>문제 내용</h5>
            <p>
              주사위는 위와 같이 생겼다. 주사위의 여섯 면에는 수가 쓰여 있다.
              위의 전개도를 수가 밖으로 나오게 접는다. A, B, C, D, E, F에 쓰여
              있는 수가 주어진다. 지민이는 현재 동일한 주사위를 N3개 가지고
              있다. 이 주사위를 적절히 회전시키고 쌓아서, N×N×N크기의 정육면체를
              만들려고 한다. 이 정육면체는 탁자위에 있으므로, 5개의 면만 보인다.
              N과 주사위에 쓰여 있는 수가 주어질 때, 보이는 5개의 면에 쓰여 있는
              수의 합의 최솟값을 출력하는 프로그램을 작성하시오.
            </p>
            <h5>제한 조건</h5>
            <p>
              첫째 줄에 N이 주어진다. 둘째 줄에 주사위에 쓰여 있는 수가
              주어진다. 위의 그림에서 A, B, C, D, E, F에 쓰여 있는 수가 차례대로
              주어진다. N은 1,000,000보다 작거나 같은 자연수이고, 쓰여 있는 수는
              50보다 작거나 같은 자연수이다.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default TestList;
