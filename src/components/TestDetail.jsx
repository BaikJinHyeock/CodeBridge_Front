import React, { useEffect, useState } from 'react'
import style from "../SCSS/pages/_testDetail.module.scss";
import CompilerTest from "../components/CompilerTest";
import axios from "axios";

const TestDetail = () => {

  const [testList, SetTestList] = useState([]);

  const getTestList = async (e) => {
    let Test = {
      user_id: sessionStorage.getItem("memberId")
    }
    const response = await axios.post(
      "http://localhost:8085/CodeBridge/Test/detail", Test);
    console.log("리스폰스 확인", response.data);
    SetTestList(response.data)
  }

  useEffect(() => {
    getTestList();
    console.log("useEffect");
  }, []);

  const [testCode, setTestCode] = useState("");

  const recieveCode = (code) => {
    setTestCode(code); // CompilerTest에서 전달된 코드를 TestDetail에서 받아와서 상태를 설정
  };

  console.log('테스트코드 확인', testCode);
  console.log('아이디 확인', sessionStorage.getItem("memberId"));


  const submitButton = async (e) => {
    e.preventDefault();
    let subTest = {
      test_num: 5,
      user_id: sessionStorage.getItem("memberId"),
      sub_code: testCode
    };
    const response = await axios.post("http://localhost:8085/CodeBridge/Code/submit", subTest);

    console.log('리스폰스 확인', response);

  }





  return (
    <div className={style.main_container}>
      <div className={style.test_list_container}>
        {testList.map((test, index) => (
          <div>
            <h2 key={index}>{`${index + 1}번문제`}</h2>
          </div>
        ))}
      </div>
      <div>
        <div>
          <h4>문제설명</h4>
          <p>세 개의 숫자 중 가장 큰 숫자를 출력하시오. </p>
        </div>
        <div>
          <h4>제한사항</h4>
          <p>-조건1: 1 &lt; = num1, num2, num3 &lt;= 100 </p>
          <p> -조건2: if문을 사용하시오. </p>
          <p> -조건3: 비교 연산자를 사용하시오. 조건4: for문을 사용하지 마시오. </p>
        </div>
      </div>
      <div>
        {/* <CompilerTest submittedCode={recieveCode} /> */}
        <button onClick={submitButton}>제출하기</button>

      </div>



    </div>
  )
}

export default TestDetail;