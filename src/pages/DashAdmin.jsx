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
  const combinedInfo = useSelector(state => state.combinedInfo);

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    setUserInfo(combinedInfo.userInfo)
  }, [combinedInfo]);

  // 신청학생 정보 긁어오기

  const [approvedList, setApprovedList] = useState([]);
  const [unApprovedList, setUnApprovedList] = useState([]);

  const getStuList = async () => {
    try {
      const res = await axios.get(`${baseUrl}/CodeBridge/class/getstu?class_num=${userInfo.hasclass}`)
      const approvedList = res.data.filter(item => item.approved === 1);
      const unApprovedList = res.data.filter(item => item.approved === 0);
      setApprovedList(approvedList);
      setUnApprovedList(unApprovedList);
    } catch (error) {
    }
  }

  console.log('승인리스트', approvedList);
  console.log('미승인', unApprovedList);

  useEffect(() => {
    getStuList();
  }, [userInfo])

  // 승인하기
  const acceptStu = async (user_id) => {
    try {
      const res = await axios.post(`${baseUrl}/CodeBridge/class/accept?user_id=${user_id}`)
      if(res.data == "success"){
        alert('전환 성공')
        window.location.reload();
      }else{
        alert('전환 실패')
      }

    } catch (error) {
      alert(`통신오류 ${error}`)
    }
  }

  const UnApprovedItem = ({ props }) => {
    const handleAcceptClick = () => {
      acceptStu(props.user_id);
    }
    return (
      <div>
        <p>{props.user_id}</p>
        <div onClick={handleAcceptClick}>
          승인하기
        </div>
      </div>
    )
  }

  const ApprovedItem = ({ props }) => {

    return (
      <div>
        <p>{props.user_id}</p>
      </div>
    )
  }

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

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </div>
                        <div className={style.setTable_userId_editId}>
                          <form>
                            <div class="input-group mb-3">
                              <input type="text" class="form-control" />
                              <span>Null</span>
                            </div>
                            <div>
                              <button
                                type="submit"
                                className={style.accept_button}
                              >
                                수정 완료
                              </button>
                            </div>
                          </form>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </div>
                        <div className={style.setTable_userPw_editId}>
                          <form>
                            <div class="input-group mb-3">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="새 닉네임"
                              />
                              <span>null</span>
                            </div>

                            <div>
                              <button
                                type="submit"
                                className={style.accept_button}
                              >
                                수정 완료
                              </button>
                            </div>
                          </form>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </div>
                        <div className={style.setTable_userPw_editId}>
                          <form>
                            <div class="input-group mb-3">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="새 닉네임"
                              />
                              <span>null</span>
                            </div>

                            <div>
                              <button
                                type="submit"
                                className={style.accept_button}
                              >
                                수정 완료
                              </button>
                            </div>
                          </form>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </div>
                        <div className={style.setTable_userNum_editId}>
                          <form>
                            <div class="input-group mb-3">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="휴대폰 번호"
                              />
                              <span>null</span>
                            </div>
                            <div>
                              <button
                                type="submit"
                                className={style.accept_button}
                              >
                                수정 완료
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>강의실 삭제</td>
                    <td>
                      <button type="button">삭제</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

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
