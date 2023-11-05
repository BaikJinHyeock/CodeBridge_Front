import React, { useEffect, useState } from 'react';
import style from '../SCSS/pages/_testList.module.scss';
import Profile from '../components/Profile';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashRightBoxTeacher from "../components/DashRightBoxTeacher";

const TestList_teacher = () => {

    // 스프링 주소
    const baseUrl = process.env.REACT_APP_BASE_URL;

    // redux 값 뺴오기
    const combinedInfo = useSelector(state => state.combinedInfo);

    const [userInfo, setUserInfo] = useState([]);
    const [classInfo, setClassInfo] = useState([]);


    useEffect(() => {
        setUserInfo(combinedInfo.userInfo)
        setClassInfo(combinedInfo.classInfo)
    }, [combinedInfo]);



    const [subList, setSubList] = useState([]); // 데이터를 저장할 상태 추가


    const getSubs = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/CodeBridge/sub/getsub?class_num=${classInfo.class_num}`
            );
            setSubList(response.data); // 데이터를 상태에 저장
        } catch (error) {
            console.error("데이터 가져오기에 실패했습니다.", error);
        }
    };

    useEffect(() => {
        getSubs();
    }, [classInfo]);

    const TestItem = ({ props }) => {
        return (
            <div className={style.item}>
                <div>
                    <h5>{props.sub_title}</h5>
                </div>
                {props.tested == 1 ?
                    <button type="button" className={style.test_btn_tested}>
                        테스트 출제하기
                    </button>
                    :
                    <Link to={`/TestSetList?sub_num=${props.sub_num}`}>
                        <button type="button" className={style.test_btn}>
                            테스트 출제하기
                        </button>
                    </Link>
                }

            </div>
        );
    };

    return (
        <div className={style.wrap_container}>
            <div className={style.right_container}>
                <Profile />
                <div className={style.right_container_grid_box}>
                    <h4>테스트 관리</h4>

                    <div className={style.right_container_grid_box_detail}>
                        {subList.map((item, index) => (
                            <TestItem key={index} props={item} />
                        ))}
                    </div>
                </div>
            </div>
            <DashRightBoxTeacher />
        </div>
    );
};

export default TestList_teacher;
