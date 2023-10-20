import axios from "axios";
import React, { useState } from "react";
import style from "../SCSS/pages/_classWrite.module.scss";
import QuillCompo from "../components/QuillCompo";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ClassWrite = () => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [content, setContent] = useState("");
  const [additionalInputs, setAdditionalInputs] = useState([
    { week: "", content: "" },
  ]);

  const handleAddInput = () => {
    setAdditionalInputs([...additionalInputs, { week: "", content: "" }]);
  };

  const handleInputChange = (index, event) => {
    const updatedInputs = [...additionalInputs];
    updatedInputs[index][event.target.name] = event.target.value;
    setAdditionalInputs(updatedInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 주차와 내용을 ":"로 구분하고, 각 쌍을 ","로 구분하여 문자열로 만듦
    const curriculumString = additionalInputs
      .map((input) => `${input.week}::${input.content}`)
      .join(",, ");

    let ClassList = {
      user_id: sessionStorage.getItem("memberId"),
      class_title: title,
      class_content: content,
      class_target: target,
      curriculum: curriculumString,
      class_startdate: startDate,
      class_enddate: endDate,
      // curriculum에 문자열을 할당
    };
    console.log("값 확인", ClassList);
    const response = await axios.post(
      "http://localhost:8085/CodeBridge/Class/write",
      ClassList
    );
    console.log("리스폰스 확인", response.data);

    // 여기에 axios를 사용하여 서버로 데이터를 보내는 코드를 작성하면 됩니다.
  };



  // 모달 관련
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 모달 관련

  return (
    <div className={style.wrap_container}>
      <ul>
        <Link to={"/ClassWrite"}>
          <li>
            강의실 생성
            <span></span>
          </li>
        </Link>
        <Link to={"/SubWrite"}>
          <li>
            과목 생성
          </li>
        </Link>
      </ul>

      <div className={style.first_container}>
        <div className={style.left_container}>
          <span>Application for Class Opening</span>
          <h1>
            강사님의 교육과정에 대해
            <br />
            소개해주세요
          </h1>
        </div>

        <div className={style.right_container}>
          <form>
            <div className={style.input_box}>
              <span className={style.span_tag}>교육 명</span>
              <input
                type="text"
                value={title}
                placeholder="Title"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>

            <div className={style.input_box}>
              <span className={style.span_tag}>교육 대상</span>
              <input
                type="text"
                value={target}
                placeholder="Education target audience"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={(e) => setTarget(e.target.value)}
              ></input>
            </div>

            <div className={style.input_box}>
              <span className={style.span_tag}>교육 기간</span>
              <div className={style.input_date}>
                <input
                  type="date"
                  value={startDate}
                  class="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setStartDate(e.target.value)}
                ></input>

                <input
                  type="date"
                  value={endDate}
                  class="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setEndDate(e.target.value)}
                ></input>
              </div>
            </div>

            <div className={style.input_box}>
              <span className={style.span_tag}>교육 설명</span>
              {/*             <textarea
              value={content}
              placeholder="Description of education"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) => setContent(e.target.value)}
            ></textarea> */}
              <QuillCompo />
            </div>

            <div className={style.input_box}>
              <span className={style.span_tag}>
                커리큘럼
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-plus-circle-fill"
                  viewBox="0 0 16 16"
                  onClick={handleAddInput}
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
              </span>

              {additionalInputs.map((input, index) => (
                <div key={index} className={style.input_cur}>
                  <input
                    type="text"
                    name="week"
                    value={input.week}
                    placeholder="주차"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  {/*                   <input
                    type="text"
                    name="content"
                    value={input.content}
                    placeholder="주차 별 내용"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e) => handleInputChange(index, e)}
                  /> */}
                  <div onClick={handleShow}>
                    과목 선택
                  </div>
                  <Modal
                    show={show}
                    onHide={handleClose}
                    style={{ top: '20%' }}
                  >
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
              ))}

              {/* <List /> */}
            </div>
          </form>
          <button
            type="submit"
            className={style.submit_button}
            onClick={handleSubmit}
          >
            교육 개설
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassWrite;
