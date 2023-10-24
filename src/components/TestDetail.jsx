import React, { useEffect, useState } from "react";
import style from "../SCSS/pages/_testDetail.module.scss";
import CompilerTest from "../components/CompilerTest";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const TestDetail = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sub_num = params.get("sub_num");

  console.log("sub_num확인", sub_num);

  const [testList, SetTestList] = useState([]);
  const [testcontents, setTestcontents] = useState("");
  const [condition, setTestCondition] = useState("");
  const [selectedTestIndex, setSelectedTestIndex] = useState(null);

  const getTestList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/CodeBridge/Test/detail?sub_num=${sub_num}`);
      SetTestList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTestList();

  }, []);

  useEffect(() => {
    // testList가 존재하고, 길이가 0보다 큰 경우에만 selectall 호출
    if (testList && testList.length > 0) {
      selectall(0);
    }
  }, [testList]);
  const [testCode, setTestCode] = useState("");

  const recieveCode = (code) => {
    setTestCode(code); // CompilerTest에서 전달된 코드를 TestDetail에서 받아와서 상태를 설정
  };

  console.log("테스트코드 확인", testCode);
  console.log("아이디 확인", sessionStorage.getItem("memberId"));

  const submitButton = async (e) => {
    e.preventDefault();
    let subTest = {
      test_num: 5,
      user_id: sessionStorage.getItem("memberId"),
      sub_code: testCode,
    };
    const response = await axios.post(
      "http://localhost:8085/CodeBridge/Code/submit",
      subTest
    );

    console.log("리스폰스 확인", response);
  };

  const selectall = (index) => {
    setTestcontents(testList[index].test_contents);
    setTestCondition(testList[index].test_condition);
    setSelectedTestIndex(index);
  };
  // const selectall = (e) => {
  //   const index = e.currentTarget.getAttribute("data-index")
  //   console.log("index는?");
  //   setTestcontents(testList[index].test_contents);
  //   setTestCondotion(testList[index].test_condition);

  //   const elements = document.querySelectorAll(`.${style.test_list_container_item}`);

  //   elements.forEach((element) => {
  //     element.classList.remove('active');
  //   });

  //   e.currentTarget.classList.add('active');

  // }

  return (
    <div className={style.wrap_container}>
      <div className={style.test_list_container}>
        {testList.map((test, index) => (
          <div key={index}>
            <div
              onClick={() => selectall(index)}
              className={`${style.test_list_container_item} ${selectedTestIndex === index ? style.active : ""
                }`}
            >
              {`${index + 1}번 문제`}
            </div>
          </div>
        ))}
      </div>
      <div className={style.test_condition}>
        <div className={style.test_condition_explan}>
          <h4>문제설명</h4>
          <p>{testcontents}</p>
        </div>
        <div className={style.test_condition_explan}>
          <h4>제한사항</h4>
          <p>{condition}</p>
        </div>
      </div>
      <div className={style.test_compiler}>
        {/* <CompilerTest className={style.div_box} submittedCode={recieveCode} /> */}
        <iframe src="http://59.0.234.207:8083/?folder=/home/smhrd/test" />

      </div>
    </div>
  );
};

export default TestDetail;
