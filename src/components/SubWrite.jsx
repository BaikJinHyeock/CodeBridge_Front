import React, { useState } from 'react';
import style from "../SCSS/pages/_classWrite.module.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';

const SubWrite = () => {

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
            user_id: sessionStorage.getItem("memberId"),
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

    // tab버튼 관련
    const [isClassSectionActive, setClassSectionActive] = useState(true);
    const [isSubjectSectionActive, setSubjectSectionActive] = useState(false);

    const activateClassSection = () => {
        setClassSectionActive(true);
        setSubjectSectionActive(false);
    };
    const activateSubjectSection = () => {
        setClassSectionActive(false);
        setSubjectSectionActive(true);
    };


    // 모달 관련
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 모달 관련

    return (
        <div className={style.wrap_container}>
            <ul>
                <Link to={"/ClassWrite"}>
                    <li onClick={activateClassSection}>
                        강의실 생성
                    </li>
                </Link>
                <Link to={"/SubWrite"}>
                    <li onClick={activateSubjectSection}>
                        과목 생성
                        <span></span>
                    </li>
                </Link>
            </ul>
            <div className={style.second_container}>
                <div className={style.left_container}>
                    <span>Creating a Subject</span>
                    <h1>
                        강사님의 과목에 대해
                        <br />
                        소개해주세요
                    </h1>
                </div>

                <div className={style.right_container}>
                    <form>
                        <div className={style.input_box}>
                            <span className={style.span_tag}>과목 명</span>
                            <input
                                type="text"
                                value={title}
                                placeholder="Subject title"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={(e) => setTitle(e.target.value)}
                            ></input>
                        </div>

                        <div className={style.input_box}>
                            <span className={style.span_tag}>과목 언어</span>
                            <input
                                type="text"
                                value={target}
                                placeholder="Subject language"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={(e) => setTarget(e.target.value)}
                            ></input>
                        </div>

                        <div className={style.input_box}>
                            <span className={style.span_tag}>과목 강사</span>
                            <input
                                type="text"
                                value={target}
                                placeholder="Subject Instructor"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={(e) => setTarget(e.target.value)}
                            ></input>
                        </div>
                    </form>
                    <button
                        type="submit"
                        className={style.submit_button}
                        onClick={handleSubmit}
                    >
                        과목 개설
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubWrite