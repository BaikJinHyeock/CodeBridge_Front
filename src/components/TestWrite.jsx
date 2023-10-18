import React, { useState } from 'react'
import style from "../SCSS/pages/_testWrite.module.scss";
import axios from 'axios';

const TestWrite = () => {

    const [test_name, setTest_name] = useState("");
    const [test_level, setTest_level] = useState("");
    const [test_lang, setTest_lang] = useState("");
    const [test_contents, setTest_contents] = useState("");
    const [test_condition, setTest_condition] = useState("");

    const testSub = async (e) => {
        e.preventDefault();
        let test = {
            test_name: test_name,
            test_level: test_level,
            test_lang: test_lang,
            test_contents: test_contents,
            test_condition: test_condition
        };
        console.log('test데이터 확인', test);
        const response = await axios.post(
            "http://localhost:8085/CodeBridge/Test/write", test);
        console.log("리스폰스 확인", response);

        if (response.data == "1") {
            alert("시험등록성공");
            window.location.href = '/'
        } else {
            return alert("시험등록실패!")
        }
    };
    return (
        <div className={style.main_container}>
            <div className={style.left_container}>
                <p>Plase fill out the question</p>
                <h2>테스트 내용에 대해 작성해주세요</h2>
            </div>

            <div className={style.right_container}>

                <form onSubmit={testSub}>
                    <h4>테스트 제목</h4>
                    <input type="text" className='form-control' value={test_name}
                        onChange={(e) => setTest_name(e.target.value)} />
                    <h4>테스트 난이도</h4>
                    <select className='form-control' value={test_level}
                        onChange={(e) => setTest_level(e.target.value)} >
                        <option>상</option>
                        <option>중</option>
                        <option>하</option>
                    </select>
                    <h4>테스트 언어 선택</h4>
                    <select className='form-control' name='recruit' value={test_lang} onChange={(e) => setTest_lang(e.target.value)}>
                        <option>Java</option>
                        <option>Python</option>
                    </select>
                    <h4>문제 설명</h4>
                    <textarea name="" className='form-control' value={test_contents}
                        onChange={(e) => setTest_contents(e.target.value)} />
                    <h4>제한조건</h4>
                    <textarea name="" className='form-control' value={test_condition}
                        onChange={(e) => setTest_condition(e.target.value)} />


                    <button type="submit">시험등록</button>
                </form>



            </div>


        </div>
    )
}
export default TestWrite;