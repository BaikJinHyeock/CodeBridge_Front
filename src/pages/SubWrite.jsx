import React, { useState } from 'react';
import style from "../SCSS/pages/_classWrite.module.scss";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import QuillCompo from "../components/QuillCompo";
import { useDispatch, useSelector } from 'react-redux';
import { updateQuillValue } from '../actions/quillActions';

const SubWrite = () => {

    // 스프링 주소
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const quillValue = useSelector((state) => state.quill.quillValue);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [teacher, setTeacher] = useState("");
    const [language, setLanguage] = useState("Java"); // 기본값으로 Java를 설정합니다.



    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !quillValue) {
            alert("모든 값을 채워주세요");
            return; // 값이 비어있으면 함수 종료
        }

        try {
            let obj = {
                sub_title: title,
                user_id: sessionStorage.getItem("memberId"),
                sub_lang: language,
                sub_content: quillValue
            };

            const response = await axios.post(
                `${baseUrl}/CodeBridge/sub/write`,
                obj
            );
            if (response) {
                alert('작성 성공')
                dispatch(updateQuillValue());
                window.location.reload();
            } else {
                alert('작성 실패')
            }

        } catch (error) {
            console.error('통신에러', error);
        }

    };



    return (
        <div className={style.wrap_container}>
            <ul>
                <Link to={"/ClassWrite"}>
                    <li>
                        강의실 생성
                    </li>
                </Link>
                <Link to={"/SubWrite"}>
                    <li>
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
                                onChange={(e) => setTitle(e.target.value)}
                            ></input>
                        </div>
                        <div className={style.input_box}>
                            <span className={style.span_tag}>과목 언어</span>
                            <select className="form-control"
                                value={language} // 현재 선택된 언어를 표시합니다.
                                onChange={(e) => setLanguage(e.target.value)} // 언어가 변경될 때마다 호출됩니다.
                            >
                                <option value="Java">Java</option>
                                <option value="Python">Python</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="HTML/CSS">HTML/CSS</option>
                                <option value="React">React</option>
                                <option value="Hadoop">Hadoop</option>
                                <option value="Spring">Spring</option>
                                <option value="Node.js">Node.js</option>
                                <option value="크롤링">크롤링</option>
                                <option value="M.L">M.L</option>
                                <option value="D.L">D.L</option>
                            </select>
                        </div>
                        {/* <div className={style.input_box}>
                            <span className={style.span_tag}>과목 강사</span>
                            <input
                                type="text"
                                value={teacher}
                                placeholder="Subject Instructor"
                                class="form-control"
                                onChange={(e) => setTeacher(e.target.value)}
                            ></input>
                        </div> */}
                        <div className={style.input_box}>
                            <span className={style.span_tag}>과목 설명</span>
                            <QuillCompo />
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