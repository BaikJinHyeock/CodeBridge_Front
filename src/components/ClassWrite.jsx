import axios from "axios";
import React, { useState } from "react";

const ClassWrite = () => {

  const [title, setTitle] = useState("");
  const [lang, setLang] = useState("");
  const [intro, setIntro] = useState("");
  const [goal, setGoal] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [teacher_intro, setTeacher_intro] = useState("");

  const Class = async (e) => {
    e.preventDefault();
    let class = {
      class_title: title,
      class_lang : lang,
      class_intro: intro,
      teacher_intro: teacher_intro,
      class_goal: goal,
      class_start: start,
      class_end: end
    };
    const response = await axios.post("http://localhost:8085/CodeBridge/MemberLogin.do", class);
    console.log('리스폰스 확인', response);
  }
  return (
    <div>
      <form onSubmit={Class}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}>강의명</input>
        <input type="checkbox" name="lang" value={java}>자바</input>
        <input type="checkbox" name="lang" value={javascript}>자바스크립트</input>
        <input type="checkbox" name="lang" value={python}>파이썬</input>
        <input type="checkbox" name="lang" value={HTML/CSS}>HTML/CSS</input>
        <input type="checkbox" name="lang" value={jsp/servlet}>jsp/servlet</input>
        <input type="checkbox" name="lang" value={react}>리엑트</input>
        <input type="checkbox" name="lang" value={spring}>스프링</input>
        <input type="checkbox" name="lang" value={database}>데이터베이스</input>
        <input type="checkbox" name="lang" value={golang}>Golang</input>
        <input type="checkbox" name="lang" value={erlng}>Erlang</input>
        <input type="checkbox" name="lang" value={machinelearning}>머신러닝</input>
        <input type="checkbox" name="lang" value={deeplearning}>딥러닝</input>
        <input type="checkbox" name="lang" value={spring}>스프링</input>
        <input type="checkbox" name="lang" value={C샵}>C샵</input>
        <input type="checkbox" name="lang" value={C++}>C++</input>
        <input type="checkbox" name="lang" value={C}>C</input>
        <input type="checkbox" name="lang" value={php}>PHP</input>
        <input type="checkbox" name="lang" value={ruby}>루비</input>
        <input type="checkbox" name="lang" value={Haskell}>Haskell</input>
        <input type="checkbox" name="lang" value={Smalltalk}>Smalltalk</input>
        <input type="checkbox" name="lang" value={Pascal}>Pascal</input>
        <input type="checkbox" name="lang" value={Lisp}>Lisp</input>
        <input type="checkbox" name="lang" value={Ada}>Ada</input>
        <input type="checkbox" name="lang" value={Lua}>Lua</input>
        <input type="checkbox" name="lang" value={Prolog}>Prolog</input>
        <input type="checkbox" name="lang" value={node}>node</input>
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
