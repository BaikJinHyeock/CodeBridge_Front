import axios from "axios";
import React, { useState } from "react";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="제목"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <br />
        <br />
        <input
          type="text"
          value={target}
          placeholder="교육대상"
          onChange={(e) => setTarget(e.target.value)}
        ></input>
        <br />
        <br />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        ></input>

        <br />
        <br />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        ></input>

        <br />
        <br />
        <input
          type="text"
          value={content}
          placeholder="교육설명"
          onChange={(e) => setContent(e.target.value)}
        ></input>

        <br />
        <br />
        <div>
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

          {additionalInputs.map((input, index) => (
            <div key={index}>
              <input
                type="text"
                name="week"
                value={input.week}
                placeholder="주차"
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="text"
                name="content"
                value={input.content}
                placeholder="주차 별 내용"
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          ))}

          {/* <List /> */}
        </div>
        <hr />

        <button type="submit">교육개설</button>
      </form>
    </div>
  );
};

export default ClassWrite;
