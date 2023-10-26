import React, { useState } from "react";
import style from "../SCSS/pages/_testWrite.module.scss";
import axios from "axios";
import QuillCompo_test from "./QuillCompo_test";
import { useSelector } from "react-redux";

const TestWrite = () => {
  const [test_title, setTest_title] = useState("");
  const [test_level, setTest_level] = useState("0");
  const [test_lang, setTest_lang] = useState("Java");
  const [test_contents, setTest_contents] = useState("");
  const [test_condition, setTest_condition] = useState("");

  const quillValue = useSelector((state) => state.quill.quillValue);

  const testSub = async (e) => {
    e.preventDefault();
    let test = {
      test_title: test_title,
      test_level: test_level,
      test_lang: test_lang,
      test_contents: test_contents,
      test_condition: quillValue,
    };
    console.log("test데이터 확인", test);
    const response = await axios.post(
      "http://localhost:8085/CodeBridge/Test/write",
      test
    );
    console.log("리스폰스 확인", response);

    if (response.data == "1") {
      alert("시험등록성공");
      window.location.href = "/";
    } else {
      return alert("시험등록실패!");
    }
  };



  return (
    <div className={style.wrap_container}>
      <div className={style.left_container}>
        <span>Plase fill out the question</span>
        <h1>
          테스트 내용에 대해
          <br /> 작성해주세요
        </h1>
      </div>

      <div className={style.right_container}>
        <h5>테스트 정보</h5>

        <form >
          <div className={style.input_box}>
            <span>테스트 제목</span>
            <input
              type="text"
              className="form-control"
              placeholder="Test Title"
              value={test_title}
              onChange={(e) => setTest_title(e.target.value)}
            />
          </div>

          <div className={style.input_box}>
            <span>테스트 난이도</span>
            <select
              className="form-control"
              onChange={(e) => setTest_level(e.target.value === "하" ? 0 : e.target.value === "중" ? 1 : 2)}
            >
              <option >하</option>
              <option >중</option>
              <option >상</option>
            </select>
          </div>

          <div className={style.input_box}>
            <span>테스트 언어 선택</span>
            <select
              className="form-control"
              name="recruit"
              value={test_lang}
              onChange={(e) => setTest_lang(e.target.value)}
            >
              <option>Java</option>
              <option>Python</option>
            </select>
          </div>

          <div className={style.input_box}>
            <span>문제 설명</span>
            <textarea
              name=""
              className="form-control"
              placeholder="Problem description"
              value={test_contents}
              onChange={(e) => setTest_contents(e.target.value)}
            />
          </div>

          <div className={style.input_box}>
            <span>제한조건</span>
            <QuillCompo_test />
          </div>
        </form>
        <button className={style.sub_btn} type="submit" onClick={testSub}>시험등록</button>

      </div>
    </div>
  );
};
export default TestWrite;
