import axios from "axios";
import React, { useState } from "react";

const ClassWrite = () => {

  const [title, setTitle] = useState("");

  const [intro, setIntro] = useState("");
  const [goal, setGoal] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [teacher_intro, setTeacher_intro] = useState("");

  const Class = async (e) => {
    e.preventDefault();
    let clas1s = {
      class_title: title,
      class_intro: intro,
      teacher_intro: teacher_intro,
      class_goal: goal,
      class_start: start,
      class_end: end
    };
    const response = await axios.post("http://localhost:8085/CodeBridge/MemberLogin.do", clas1s);
    console.log('리스폰스 확인', response);
  }
  return (
    <div>
      <form onSubmit={Class}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}>강의명</input>
        <input type="text" value={intro} onChange={(e) => setIntro(e.target.value)}>강의설명글</input>
        <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)}>강의목표</input>
        <input type="date" value={start} onChange={(e) => setStart(e.target.value)}>강의개설일</input>
        <input type="date" value={end} onChange={(e) => setEnd(e.target.value)}>강의종료일</input>
        <input type="date" value={teacher_intro} onChange={(e) => setTeacher_intro(e.target.value)}>강사소개</input>
        <button type="submit">강의개설</button>
      </form>
    </div>
  );
};

export default ClassWrite;
