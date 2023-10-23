import React from "react";
import style from "../SCSS/pages/_classDetail.module.scss";

const ClassDetail = () => {
  return (
    <div className={style.wrap_container}>
      <div className={style.left_container}>
        <div className={style.left_container_title_box}>
          <span>취업연계과정</span>
          <h1>[A-1코스] 빅데이터 
            분석서비스 개발자과정</h1>
        </div>

        <div className={style.left_container_profile}>
          <div className={style.left_container_profile_img}>
            <img
              src="https://i.pinimg.com/564x/d7/94/c3/d794c38660990eca6134e885c59c7470.jpg"
              alt="profile"
            />
          </div>
          <h4>박수현 강사</h4>
          <ul>
            <li><p>44개 국가 대상 인력양성특강</p></li>
            <li><p>인공지능 사관학교  총괄 PL</p></li>
            <li><p>전남대 등 5개 대학 총괄</p></li>
            <li><p>8개반 취업률 91.2% 달성</p></li>
          </ul>
        </div>
      </div>

      <div className={style.right_container}>
        <h4>교육과정 정보</h4>

        <div>
          <h5>교육 대상</h5>
          <span>
            취업을 준비하는 대학 졸업(예정)자 (대학 재학생(3학년~), 휴학,
            졸업유예, 대학원생, 고졸 가능)
          </span>
        </div>

        <div>
          <h5>교육 기간</h5>
          <span>2023. 11. 21 ~ 2024. 05. 23</span>
        </div>

        <div>
          <h5>교육 설명</h5>
          <span>
            실무트렌드를 반영해 4~5개월간 기초부터 실무까지 탄탄하게
            국비교육으로 배울 수 있는 인공지능 특화 취업연계과정 *전체
            교육과정은 오프라인 집체교육으로 운영됩니다.
          </span>
        </div>

        <div>
          <h5>커리큘럼</h5>
          <span>1주차 O.T 및 Java</span>
          <span>2주차 JavaFestival</span>
          <span>3주차 MVC패턴</span>
        </div>

        <button type="button" className={style.submit_button}>교육과정 등록</button>
      </div>
    </div>
  );
};

export default ClassDetail;
