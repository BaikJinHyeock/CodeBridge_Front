import axios from "axios";
import React, { useState } from "react";
import style from "../SCSS/pages/_classWrite.module.scss";
import QuillCompo from '../components/QuillCompo'


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

  return (
    <div className={style.wrap_container}>
      <div className={style.left_container}>
        <span>Application for Class Opening</span>
        <h1>
          강사님의 교육과정에 대해
          <br />
          소개해주세요
        </h1>
      </div>

      <div className={style.right_container}>
        <h5>교육과정 정보</h5>

        <form >
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
                <input
                  type="text"
                  name="content"
                  value={input.content}
                  placeholder="주차 별 내용"
                  class="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
            ))}

            {/* <List /> */}
          </div>
        </form>
        <button type="submit" onClick={handleSubmit}>교육 개설</button>
      </div>
    </div>
  );
};

export default ClassWrite;
