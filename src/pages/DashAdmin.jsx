import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "../SCSS/pages/_dashadmin.module.scss";
import DashRightBoxTeacher from "../components/DashRightBoxTeacher";
import Profile from "../components/Profile";

const DashAdmin = () => {
  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // redux 값 뺴오기
  const combinedInfo = useSelector((state) => state.combinedInfo);

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    setUserInfo(combinedInfo.userInfo);
  }, [combinedInfo]);

  // 신청학생 정보 긁어오기

  const [approvedList, setApprovedList] = useState([]);
  const [unApprovedList, setUnApprovedList] = useState([]);

  const getStuList = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/CodeBridge/class/getstu?class_num=${userInfo.hasclass}`
      );
      const approvedList = res.data.filter((item) => item.approved === 1);
      const unApprovedList = res.data.filter((item) => item.approved === 0);
      setApprovedList(approvedList);
      setUnApprovedList(unApprovedList);
    } catch (error) {}
  };

  console.log("승인리스트", approvedList);
  console.log("미승인", unApprovedList);

  useEffect(() => {
    getStuList();
  }, [userInfo]);

  // 승인하기
  const acceptStu = async (user_id) => {
    try {
      const res = await axios.post(
        `${baseUrl}/CodeBridge/class/accept?user_id=${user_id}`
      );
      if (res.data == "success") {
        alert("전환 성공");
        window.location.reload();
      } else {
        alert("전환 실패");
      }
    } catch (error) {
      alert(`통신오류 ${error}`);
    }
  };

  const UnApprovedItem = ({ props }) => {
    const handleAcceptClick = () => {
      acceptStu(props.user_id);
    };
    return (
      <div className={style.wrap_accept_list}>
        <span>{props.user_id}</span>
        <button type="button" onClick={handleAcceptClick}>
          승인하기
        </button>
      </div>
    );
  };

  const ApprovedItem = ({ props }) => {
    return (
      <div>
        <p>{props.user_id}</p>
      </div>
    );
  };

  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Profile />
        <div className={style.right_container_wrap}>
          <div className={style.right_container_wrap_info}>
            <h4>강의실 정보</h4>
            <div className={style.right_container_wrap_info_table}>
              <table className={style.setTable}>
                <tbody>
                  <tr>
                    <td>교육 명</td>
                    <td>
                      <div className={style.setTable_userId}>
                        <div className={style.setTable_userId_originId}>
                          <p>데이터디자인 엔지니어 양성과정</p>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>교육 대상</td>
                    <td>
                      <div className={style.setTable_userPw}>
                        <div className={style.setTable_userPw_originId}>
                          <p>취업을 준비하는 대학 졸업(예정)자</p>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>교육 기간</td>
                    <td>
                      <div className={style.setTable_userPw}>
                        <div className={style.setTable_userPw_originId}>
                          <p>2023. 04. 27 ~ 2023. 11. 27</p>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>교육 설명</td>
                    <td>
                      <div className={style.setTable_userNum}>
                        <div className={style.setTable_userNum_originId}>
                          <p>num</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className={style.right_container_wrap_bottom}>
          <div className={style.right_container_wrap_student}>
            <h4>학생 관리</h4>
            {approvedList.map((item, index) => (
              <ApprovedItem key={index} props={item} />
            ))}
          </div>

          <div className={style.right_container_wrap_accept}>
            <h4>강의실 신청 현황</h4>
            {unApprovedList.map((item, index) => (
              <UnApprovedItem key={index} props={item} />
            ))}
          </div>
        </div>
      </div>
      <DashRightBoxTeacher />
    </div>
  );
};

export default DashAdmin;
