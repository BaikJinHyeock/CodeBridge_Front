import React, { useEffect, useState } from "react";
import style from "../SCSS/pages/_classDetail.module.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ClassDetail = () => {
  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const class_num = params.get("class_num");

  const combinedInfo = useSelector(state => state.combinedInfo);

  const [userInfo, setUserInfo] = useState([]);
  const [selectedSubIndex, setSelectedSubIndex] = useState(0);


  useEffect(() => {
    setUserInfo(combinedInfo.userInfo)
  }, [combinedInfo]);

  console.log('유저인포 확인', userInfo);


  const [infoList, setInfoList] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState([]);
  const [subDetailList, setsubDetailList] = useState([]);
  const [curriArray, setCurriArray] = useState([]);

  console.log('subDetailList확인', subDetailList);

  // 반 정보, 선생님 정보 긁어오기
  const classSearch = async (e) => {
    await axios
      .get(`${baseUrl}/CodeBridge/class/findnum?class_num=${class_num}`)
      .then((res) => {
        setInfoList(res.data[0]);
        console.log('infoList 확인', res.data[0]);
        const curriculumArray = res.data[0].curriculum.match(/\[(\d+): ([^\]]+)]/g).map(item => {
          const match = item.match(/\[(\d+): ([^\]]+)]/);
          return [parseInt(match[1], 10), match[2]];
        });
        setCurriArray(curriculumArray)

        const selectedItems = curriculumArray.map((item) => item[0]);
        console.log("classSearch에서 아이템:", selectedItems);
        axios
          .post(`${baseUrl}/CodeBridge/sub/get-sub-list`, selectedItems)
          .then((res) => {
            setsubDetailList(res.data);
          })
          .catch((error) => {
            console.error();
          });
        axios
          .get(
            `${baseUrl}/CodeBridge/member/memberInfoTeacher?user_id=${res.data[0].user_id}`
          )
          .then((res) => {
            setTeacherInfo(res.data[0]);
          })
          .catch((error) => {
            console.error();
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 등록여부 확인

  const [isRegist, setIsRegist] = useState(false);

  const isRegisted = async (e) => {
    let obj = {
      class_num: class_num,
      user_id: sessionStorage.getItem("memberId"),
    };
    try {
      const res = await axios.get(`${baseUrl}/CodeBridge/class/registed`, {
        params: obj,
      });
      console.log("등록여부", res.data);
      if (res.data == "registed") {
        setIsRegist(true);
      }
    } catch (error) { }
  };

  useEffect(() => {
    classSearch();
    isRegisted();
  }, [class_num]);




  const registClass = async () => {
    let obj = {
      class_num: class_num,
      user_id: sessionStorage.getItem("memberId"),
      user_name: sessionStorage.getItem("user_name")
    };
    try {
      const res = await axios.post(`${baseUrl}/CodeBridge/class/regist`, obj);
      if (res.data == "success") {
        alert("등록 성공");
        window.location.reload();
      } else {
        alert("등록 실패");
      }
    } catch (error) {
      alert(`통신오류 ${error}`);
    }
  };




  console.log('selectedSubIndex확', selectedSubIndex);

  // 클릭 이벤트 핸들러
  const handleSubClick = (index) => {
    setSelectedSubIndex(index);
  };

  const classdelete = async () => {
    console.log("class_num=" + class_num);

    try {
      const res = await axios.post(`${baseUrl}/CodeBridge/class/delete?class_num=${class_num}`);
      console.log("클래스삭제결과", res);
      if (res.data === 1) {
        alert("삭제 성공");
        window.location.href = "/";
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      alert(`통신오류 ${error}`);
    }
  };
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
              src={teacherInfo.user_pic}
              alt="profile"
            />
          </div>
          <h4>{teacherInfo.user_name} 강사</h4>
          <span
            dangerouslySetInnerHTML={{ __html: teacherInfo.user_his }}
          ></span>
        </div>
      </div>

      <div className={style.right_container}>
        <h4>교육과정 정보</h4>

        <div className={style.right_container_nomal}>
          <h5>교육 대상</h5>
          <span>{infoList.class_target}</span>
        </div>

        <div className={style.right_container_nomal}>
          <h5>교육 기간</h5>
          <span>
            {infoList.class_startdate} ~ {infoList.class_enddate}
          </span>
        </div>

        <div className={style.right_container_nomal}>
          <h5>교육 설명</h5>
          <span
            dangerouslySetInnerHTML={{ __html: infoList.class_content }}
          ></span>
        </div>

        <div className={style.right_container_nomal}>
          <h5>커리큘럼</h5>
          <div className={style.right_container_wrap}>
            <div className={style.right_container_wrap_left}>
              {curriArray &&
                curriArray.map((item, index) => {
                  return (
                    // <p key={index}>
                    //   {`${weekDetails}: 언어: ${language}, 강사: ${instructor}, 강의 명: ${lesson}`}
                    // </p>

                    <span
                      key={index}
                      onClick={() => handleSubClick(index)}
                      style={{
                        backgroundColor:
                          selectedSubIndex === index ? "#06afd5b0" : "",
                      }}
                    >
                      {/* {item[0]}주차 {item[2]} */}
                      {item[1]}
                    </span>
                  );
                })}
            </div>
            {selectedSubIndex !== null && (
              <div className={style.right_container_wrap_right}>
                {subDetailList[selectedSubIndex] != null &&
                  <span
                    dangerouslySetInnerHTML={{
                      __html: subDetailList[selectedSubIndex].sub_content,
                    }}
                  ></span>
                }
              </div>
            )}
          </div>
        </div>

        {userInfo.user_type == 1 ?
          <>
            {infoList.class_num == userInfo.hasclass &&
              <button type="button" className={style.submit_button} onClick={classdelete}>반 삭제</button>
            }
          </>
          :
          <>
            {
              isRegist ? (
                // 버튼 비활성화 필요
                <button type="button" className={style.complete_button} > 등록됨</button>
              ) : (
                <button
                  type="button"
                  className={style.submit_button}
                  onClick={registClass}
                >
                  교육과정 등록
                </button>
              )}
          </>
        }
      </div >
    </div >
  );
};

export default ClassDetail;
