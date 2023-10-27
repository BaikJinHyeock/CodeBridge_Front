import React, { useEffect, useState } from "react";
import style from "../SCSS/pages/_classDetail.module.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ClassDetail = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const class_num = params.get("class_num");

  console.log('classu_nu 확인', class_num);

  const [infoList, setInfoList] = useState([]);
  const [toarray, setToarray] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState([]);




  const classSearch = async (e) => {
    await axios.get(`${baseUrl}/CodeBridge/class/findnum?class_num=${class_num}`)
      .then((res) => {
        setInfoList(res.data[0]);
        console.log('res확인', res.data[0]);
        console.log('아이디 옴?', res.data[0].user_id);
        setToarray(JSON.parse(res.data[0].curriculum));
        axios.get(`${baseUrl}/CodeBridge/member/memberInfoTeacher?user_id=${res.data[0].user_id}`)
          .then((res) => {
            console.log('두번째 res확', res.data[0]);
            setTeacherInfo(res.data[0]);
          }).catch((error) => {
            console.error();
          })

      }).catch((error) => {
        console.error(error);
      })

  }

  console.log('배열 확인', toarray);

  useEffect(() => {
    classSearch();
  }, []);





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
          <h4>{teacherInfo.user_name} 강사</h4>
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
