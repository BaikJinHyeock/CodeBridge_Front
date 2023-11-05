import React, { useState } from "react";
import style from "../SCSS/pages/_testWrite.module.scss";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';

const TestWrite = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const pyUrl = process.env.REACT_APP_PY_URL;

  const [test_title, setTest_title] = useState("");
  const [test_level, setTest_level] = useState(1);
  const [test_lang, setTest_lang] = useState("Java");
  const [test_description, setTest_description] = useState("");
  const [test_input, setTest_input] = useState("");


  const testSub = async (e) => {
    e.preventDefault();
    let obj = {
      test_title: test_title,
      test_level: test_level,
      test_lang: test_lang,
      test_description: test_description,
      // test_input: test_input,
      test_condition: testConditionList,
    };


    const res = await axios.post(`${baseUrl}/CodeBridge/test/write`, obj);
    // try {
    //   const res = await axios.post(`${baseUrl}/CodeBridge/test/write`, obj);
    //   console.log("리스폰스 확인", res);
    //   if (res.data == "1") {
    //     alert("시험등록성공");
    //     window.location.href = "/";
    //   } else {
    //     return alert("시험등록실패!");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }

  };


  // 제한조건 
  const [testConditionList, setTestConditionList] = useState([{ id: '테스트케이스1', value: "" }]);

  const addTestCondition = () => {
    const newId = `테스트케이스${testConditionList.length + 1}`;
    setTestConditionList([...testConditionList, { id: newId, value: "" }]);
  };


  const removeTestCondition = (id) => {
    const updatedList = testConditionList.filter(item => item.id !== id);
    setTestConditionList(updatedList);
  };

  const [gptTest, setGptTest] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const gtpTestWrite = async () => {
    setGptTest("");
    setIsLoading(true);

    try {
      const res = await axios.post(`${pyUrl}/test`);
      setGptTest(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // 호출 완료 시 로딩 종료
    }
  }



  return (
    <div className={style.wrap_container}>
      <div className={style.left_container}>
        <span>Plase fill out the question</span>
        <h1>
          테스트 내용에 대해
          <br /> 작성해주세요
        </h1>
        <div className={style.loading_box}>
          {/* {isLoading && <h4 className={style.loading_text}>AI 문제 출제중</h4>} */}
          {isLoading &&
            <div class="d-flex align-items-center" className={style.loading_text}>
              <span role="status">AI문제 출제중...</span>
              <div class="spinner-border ms-auto text-danger" aria-hidden="true"></div>
            </div>

          }
          {gptTest && (
            <div className={style.gpt_answer_wrapper}>
              <h4>AI 출제문제</h4  >
              <ul>
                {gptTest.split('\n').map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

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
              onChange={(e) => setTest_level(e.target.value === "하" ? 1 : e.target.value === "중" ? 2 : 3)}
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
            <span>테스트 설명</span>
            <textarea
              name=""
              className="form-control"
              placeholder="Problem description"
              value={test_description}
              onChange={(e) => setTest_description(e.target.value)}
            />
          </div>

          {/* <div className={style.input_box}>
            <span>입력 예시</span>
            <textarea
              name=""
              className="form-control"
              placeholder="Problem input"
              value={test_input}
              onChange={(e) => setTest_input(e.target.value)}
            />
          </div> */}

          <div className={style.input_box}>
            <span className={style.span_tag}>
              제한조건
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-circle-fill"
                viewBox="0 0 16 16"
                onClick={addTestCondition}
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </span>

            {testConditionList.map((item, index) => (
              <div className={style.input_cur} key={item.id}>
                <span>조건 {index + 1}</span>
                <input
                  type="text"
                  name="content"
                  value={item.value}
                  placeholder="제한조건"
                  className="form-control"
                  onChange={(e) => {
                    const updatedList = testConditionList.map(condition => {
                      if (condition.id === item.id) {
                        return { ...condition, value: e.target.value };
                      }
                      return condition;
                    });
                    setTestConditionList(updatedList);
                  }}
                />

                <button className={style.delete} onClick={() => removeTestCondition(item.id)}>
                  삭제
                </button>
              </div>
            ))}



          </div>

        </form>
        <button className={style.sub_btn} type="submit" onClick={testSub}>시험등록</button>
        <button className={style.sub_btn} type="button" onClick={gtpTestWrite}>AI 문제출제</button>

      </div>
    </div>
  );
};
export default TestWrite;
