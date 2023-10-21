import React, { useEffect, useState } from 'react'
import style from "../SCSS/pages/_testDetail.module.scss";
import CompilerTest from "../components/CompilerTest";
import axios from "axios";

const TestDetail = () => {

  const [testList, SetTestList] = useState([]);
  const [testcontents, setTestcontents] = useState("");
  const [condition, setTestCondotion] = useState("");


  const getTestList = async () => {

    const response = await axios.get(
      "http://localhost:8085/CodeBridge/Test/detail");
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

  const selectall = (e) => {
    const index = e.currentTarget.getAttribute("data-index")
    console.log("index는?");
    setTestcontents(testList[index].test_contents);
    setTestCondotion(testList[index].test_condition)

  }


  return (
    <div className={style.main_container}>
      <div className={style.test_list_container}>
        {testList.map((test, index) => (
          <div key={index}>
            <h2 data-index={index} onClick={selectall} >{`${index + 1}번문제`}</h2>

          </div>
        ))}
      </div>
      <div>
        <div>
          <h4>문제설명</h4>
          <p>{testcontents}</p>

        </div>
        <div>
          <h4>제한사항</h4>
          <p>{condition}</p>

        </div>
      </div>
      <div>

         <CompilerTest submittedCode={recieveCode} /> 

        <button>제출하기</button>

      </div>



    </div>
  )
}

export default TestDetail;