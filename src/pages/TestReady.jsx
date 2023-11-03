import React from 'react'
import style from "../SCSS/pages/_testReady.module.scss";

const TestReady = () => {
    return (
        <div className={style.wrap_container}>
            <div className={style.wrap_container_box}>
                <div className={style.wrap_container_box_title}>
                    <h3>테스트 준비</h3>
                    <span>시험시간 60분</span>
                </div>
                <div className={style.wrap_container_box_list}>
                    <h5>점수 흭득 방법</h5>
                    <span>
                        코딩 테스트에서 각 문제는 한 개 이상의 제한 조건을 가지게됩니다. <br/>
                        제한 조건을 모두 만족하면 최대 점수를 획득할 수 있고, <br/>
                        부분적인 제한 조건을 만족하면 해당 부분 점수를 얻게 됩니다. <br/>
                        모든 문제를 해결한 후 총 점수를 계산하여 최종 점수를 흭득하게됩니다.
                    </span>
                </div>
                <div className={style.wrap_container_box_list}>
                    <h5>제출 방법</h5>
                    <ul>
                        <li> "제출하기" 버튼을 누르면 답안을 제출하게 됩니다.</li>
                        <li> 제출 이후, 수정이 불가능하며 당신의 답안이 즉시 채점됩니다.</li>
                    </ul>
                </div>
                <div className={style.wrap_container_box_list}>
                    <h5>시험 종료</h5>
                    <ul>
                        <li> "시험 종료" 버튼을 누르면 시험이 즉시 종료됩니다.</li>
                        <li> 이 버튼을 누르면 시험 시간 종료까지 기다릴 필요가 없습니다.</li>
                    </ul>
                </div>
                <div className={style.wrap_container_box_list}>
                    <h5>유의사항</h5>
                    <ul>
                        <li> 시험을 시작하기 전에 위의 유의사항을 반드시 읽어주세요.</li>
                        <li> "시험 시작" 버튼을 클릭하면 시험이 시작됩니다. 유의사항을 숙지하고 시작하세요.</li>
                    </ul>
                </div>
                <button type='button'>
                    시험시작
                </button>
            </div>

        </div>
    )
}

export default TestReady