import axios from "axios";
import React, { useState } from "react";

const ClassWrite = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [content, setContent] = useState("");
  const [week, setWeek] = useState("");
  const [weekContent, setWeekContent] = useState("");
  const [weekList, setWeekList] = useState([]);

  const ClassWrite = async (e) => {
    e.preventDefault();
    let clas ={
      class_title: title,
      class_intro: content,
      target: subject,
      class_start: start,
      class_end: end,


    };
    const response = await axios.post(
      "http://localhost:8085/CodeBridge/ClassWrite.do",
      clas
    );
    console.log("리스폰스 확인", response);
  };

  const List = () => (
    <div>
      {weekList.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            value={item.week}
            placeholder="주차"
            onChange={(e) => handleWeekChange(e, index)}
          ></input>
          <input
            type="text"
            value={item.weekContent}
            placeholder="주차 별 내용"
            onChange={(e) => handleWeekContentChange(e, index)}
          ></input>
        </div>
      ))}
    </div>
  );

  const CreateList = () => {
    setWeekList([...weekList, { week, weekContent }]);
    // setWeek(""); // Clear the week input
    // setWeekContent(""); // Clear the weekContent input
  };

  // Update the week at the specified index
  const handleWeekChange = (e, index) => {
    const updatedList = [...weekList];
    updatedList[index].week = e.target.value;
    setWeekList(updatedList);
  };

  // Update the weekContent at the specified index
  const handleWeekContentChange = (e, index) => {
    const updatedList = [...weekList];
    updatedList[index].weekContent = e.target.value;
    setWeekList(updatedList);
  };

  return (
    <div>
      <form onSubmit={ClassWrite}>
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
          value={subject}
          placeholder="교육대상"
          onChange={(e) => setSubject(e.target.value)}
        ></input>
        <br />
        <br />

        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        ></input>

        <br />
        <br />
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
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
          <List />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-circle-fill"

            
            viewBox="0 0 16 16"
            onClick={CreateList}
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
        </div>
        <hr />

        <button type="submit">교육개설</button>
      </form>
    </div>
  );
};

export default ClassWrite;
