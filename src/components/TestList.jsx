import React from "react";
import style from "../SCSS/pages/_testList.module.scss";
import Title from "./Title";
import Profile from "./Profile";
import axios from "axios";
import { useEffect } from "react";



const TestList = () => {
    useEffect(() => {
        getSubs();
        console.log("useEffect");
    }, []);

    const getSubs = async () => {

        const response = await axios.get(
            "http://localhost:8085/CodeBridge/sub/getsub");
        console.log("리스폰스 확인", response.data[0].sub_title);
    }

    const TestItem = () => {
        return (
            <div className={style.test_item_box}>
                <div>
                    <span>1주차</span>
                    <span>쉽게 배우는 Java수업</span>
                </div>
                <div className={style.test_btn}>테스트</div>
            </div>
        );
    };

    return (
        <div className={style.wrap_container}>
            <div className={style.right_container}>
                {/* <Title pageName="테스트" /> */}
                <Profile showEditButton={false} />
            </div>

            <h2>테스트 관리</h2>
            <div className={style.test_item_wrapper}>
                <TestItem />
                <TestItem />
                <TestItem />
            </div>
        </div>
    );
};

export default TestList;
