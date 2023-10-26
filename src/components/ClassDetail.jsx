import React, { useEffect, useState } from "react";
import style from "../SCSS/pages/_classDetail.module.scss";
import axios from "axios";

const ClassDetail = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const num = 21;
  const [infoList, setInfoList] = useState([]);
  const [toarray, setToarray] = useState([]);


  useEffect(() => {
    classSearch();
  }, []);


  const classSearch = async (e) => {
    const room = {
      class_num: num
    }
    await axios.post(`${baseUrl}/CodeBridge/class/findnum`, room)
      .then(response => {
        setInfoList(response.data[0]);
        console.log("infoList", response.data[0].curriculum);
        setToarray(JSON.parse(response.data[0].curriculum));
      })
      .catch(error => {
        console.error(error);
      });
  }

  console.log('배열 확인', toarray);





  return (
    <div className={style.wrap_container}>
      <div className={style.left_container}>
        <div className={style.left_container_title_box}>
          <span>취업연계과정</span>
          <h1>{infoList.class_title}</h1>
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
            {infoList.class_target}
          </span>
        </div>

        <div>
          <h5>교육 기간</h5>
          <span>{infoList.class_startdate} ~ {infoList.class_enddate}</span>
        </div>

        <div>
          <h5>교육 설명</h5>
          <span
            dangerouslySetInnerHTML={{ __html: infoList.class_content }}>
          </span>
        </div>

        <div>
          <h5>커리큘럼</h5>
          {toarray && toarray.map((item) => {

            console.log('아이템 확인', item);

            return (
              // <p key={index}>
              //   {`${weekDetails}: 언어: ${language}, 강사: ${instructor}, 강의 명: ${lesson}`}
              // </p>
              <>
                <p>
                  {item[0]} : {item[2]}
                </p>
              </>
            );
          })}
        </div>


        <button type="button" className={style.submit_button}>교육과정 등록</button>
      </div>
    </div>
  );
};

export default ClassDetail;
