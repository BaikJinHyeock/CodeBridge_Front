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


  const [infoList, setInfoList] = useState([]);
  const [toarray, setToarray] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState([]);

  // 반 정보, 선생님 정보 긁어오기
  const classSearch = async (e) => {
    await axios.get(`${baseUrl}/CodeBridge/class/findnum?class_num=${class_num}`)
      .then((res) => {
        setInfoList(res.data[0]);
        setToarray(JSON.parse(res.data[0].curriculum));
        axios.get(`${baseUrl}/CodeBridge/member/memberInfoTeacher?user_id=${res.data[0].user_id}`)
          .then((res) => {
            setTeacherInfo(res.data[0]);
          }).catch((error) => {
            console.error();
          })

      }).catch((error) => {
        console.error(error);
      })
  }

  // 등록여부 확인

  const [isRegist, setIsRegist] = useState(false);

  const isRegisted = async (e) => {
    let obj = {
      class_num: class_num,
      user_id: sessionStorage.getItem("memberId")
    }
    try {
      const res = await axios.get(`${baseUrl}/CodeBridge/class/registed`, { params: obj })
      console.log('등록여부', res.data);
      if (res.data == 'registed') {
        setIsRegist(true);
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    classSearch();
    isRegisted();
  }, []);

  const registClass = async () => {
    let obj = {
      class_num: class_num,
      user_id: sessionStorage.getItem("memberId")
    }
    try {
      const res = await axios.post(`${baseUrl}/CodeBridge/class/regist`, obj)
      if (res.data == "success") {
        alert("등록 성공")
      } else {
        alert("등록 실패")
      }
    } catch (error) {
      alert(`통신오류 ${error}`)
    }
  }


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
          {toarray && toarray.map((item, index) => {
            return (
              // <p key={index}>
              //   {`${weekDetails}: 언어: ${language}, 강사: ${instructor}, 강의 명: ${lesson}`}
              // </p>

              <p key={index}>
                {item[0]} : {item[2]}
              </p>

            );
          })}
        </div>

        {isRegist ?
        // 버튼 비활성화 필요
          <p>등록됨</p>
          :
          <button type="button" className={style.submit_button}
            onClick={registClass}
          >교육과정 등록</button>

        }
      </div>

    </div>
  );
};

export default ClassDetail;
