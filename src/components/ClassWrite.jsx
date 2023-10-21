import axios from "axios";
import React, { useEffect, useState } from "react";
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
  const [findLang, setFindLang] = useState();
  const [findLangList, setFindLangList] = useState([]);

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

  const subListByName = async (e) => {
    e.preventDefault();
    console.log('입력한 이름', findLang);

    let obj = {
      sub_lang: findLang,
    };

    const response = await axios.post(
      "http://localhost:8085/CodeBridge/sub/findbyname",
      obj
    );

    console.log('응답 확인', response.data);
    setFindLangList(response.data);


  };

  // 모달 관련
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [selectedWeekIndex, setSelectedWeekIndex] = useState(null);
  const handleShow = (index) => {
    setSelectedWeekIndex(index);
    setShow(true);
  }
  // 모달 관련



  // 과목 전부 긁어오는 코드
  const [subList, setSubList] = useState([]);

  const getSubList = async (e) => {
    const response = await axios.get(
      "http://localhost:8085/CodeBridge/sub/find"
    );
    console.log('응답 확인', response.data);
    setSubList(response.data);
  };

  useEffect(() => {
    getSubList();
  }, []);

  const SubItem = ({ props, handleSubItemClick }) => {
    const handleItemClick = () => {
      handleSubItemClick(props); // 클릭 시 부모 컴포넌트의 함수 호출
    }
    return (
      <div className={style.sub_item_box} onClick={handleItemClick}>
        <span>언어 : {props.sub_lang}</span>
        <span>강사 : {props.user_name}</span>
        <span>강의 명 : {props.sub_title}</span>
      </div>
    );
  }



  console.log('배열 확인', additionalInputs);

  // ...
  const handleSubItemClick = (item, index) => {
    const updatedInputs = [...additionalInputs];
    updatedInputs[index].content = `언어: ${item.sub_lang}, 강사: ${item.user_name}, 강의 명: ${item.sub_title}`;
    setAdditionalInputs(updatedInputs);
    setFindLang();
    setFindLangList([]);
    handleClose(); // 모달 닫기
  }




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


                  {input.content ? (
                    <div className={style.selectedSubItem} onClick={() => handleShow(index)}>
                      <span>{input.content}</span>
                    </div>
                  ) : (
                    <div onClick={() => handleShow(index)}>
                      과목 선택
                    </div>
                  )}
                </div>
              ))}
              <Modal
                show={show}
                onHide={handleClose}
                style={{ top: '20%' }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>과목 목록</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <style>
                    {`.modal-content {width: 600px;}`}
                  </style>

                  <div>
                    <form onSubmit={subListByName}>
                      <input
                        type="text"
                        value={findLang}
                        placeholder="과목 검색"
                        class="form-control"
                        onChange={(e) => setFindLang(e.target.value)} />
                    </form>
                  </div>


                  {findLangList.length > 0 ?
                    findLangList.map((item, index) => (
                      <SubItem key={index} props={item} handleSubItemClick={() => handleSubItemClick(item, selectedWeekIndex)} />
                    ))
                    :
                    subList.map((item, index) => (
                      <SubItem key={index} props={item} handleSubItemClick={() => handleSubItemClick(item, selectedWeekIndex)} />
                    ))
                  }



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
