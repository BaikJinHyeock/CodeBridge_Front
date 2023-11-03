import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "../SCSS/pages/_dashadmin.module.scss";
import DashRightBoxTeacher from "../components/DashRightBoxTeacher";
import Profile from "../components/Profile";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const DashAdmin = () => {
  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // redux 값 뺴오기
  const combinedInfo = useSelector((state) => state.combinedInfo);

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    setUserInfo(combinedInfo.userInfo);
  }, [combinedInfo]);

  useEffect(() => {
    getStudent();
  }, [userInfo])

  const [stuList, setStuList] = useState([]);

  // 반 학생 리스트 긁어오기
  const getStudent = async () => {
    try {
      const res = await axios.get(`${baseUrl}/CodeBridge/class/getClassStu?class_num=${userInfo.hasclass}`);
      console.log('받아온 학생 리스트 확인', res.data);
      setStuList(res.data)
    } catch (error) {
    }
  }




  // 신청학생 정보 긁어오기

  const [approvedList, setApprovedList] = useState([]);
  const [unApprovedList, setUnApprovedList] = useState([]);

  const getStuList = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/CodeBridge/class/getstu?class_num=${userInfo.hasclass}`
      );
      const approvedList = res.data.filter((item) => item.approved === 1);
      const unApprovedList = res.data.filter((item) => item.approved === 0 && item.isteacher === 0);
      setApprovedList(approvedList);
      setUnApprovedList(unApprovedList);
    } catch (error) { }
  };

  const [subNumList, setSubNumList] = useState([]);
  const getSubNumList = async () => {

    try {
      const res = await axios.get(`${baseUrl}/CodeBridge/sub/get-sub-num?class_num=${userInfo.hasclass}`)
      setSubNumList(res.data);
    } catch (error) {

    }
  }


  useEffect(() => {
    getStuList();
    getSubNumList();
  }, [userInfo]);

  // 승인하기
  const acceptStu = async (user_id) => {
    let obj = {
      user_id: user_id,
      sub_num: subNumList
    }
    try {
      const res = await axios.post(`${baseUrl}/CodeBridge/class/accept`, obj);
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
        <div className={style.wrap_accept_list_box}>
          <span>{props.user_name}</span>
          <span>{props.user_id}</span>
        </div>
        <button type="button" onClick={handleAcceptClick}>
          승인하기
        </button>
      </div>
    );
  };

  const ApprovedItem = ({ props }) => {
    return (
      <div className={style.wrap_accept_list}>
        <span>{props.user_name}</span>
        <span>{props.user_id}</span>
      </div>
    );
  };

  const [ideUrlList, setIdeUrlList] = useState([]);

  // 부여 안된 ide주소 긁어오기
  const getIdeUrl = async () => {
    try {
      const res = await axios.get(`${baseUrl}/CodeBridge/member/getIdeUrl`);
      setIdeUrlList(res.data)
    } catch (error) {

    }
  }

  const IDEItem = ({ index, props, user_id }) => {
    console.log('모달 아이디 확인', user_id);

    // ide 부여
    const giveIde = async () => {


      const confirmSubmit = window.confirm("IDE를 부여 하시겠습니까?");

      if (confirmSubmit) {
        let obj = {
          server_url: props,
          user_id: selectUser
        }
        console.log('obj확인', obj);
        try {
          const res = await axios.post(`${baseUrl}/CodeBridge/member/giveIde`, obj);
          console.log('응답화기이니이인', res.data);
          if (res.data == "success") {
            alert("부여 완료")
            window.location.reload();
          } else {
            alert("부여 실패")
          }
        } catch (error) {

        }
      }
    }

    return (
      <div className={style.ide_modal}>
        <p>
          {index + 1} . {props}
        </p>
        <button type="button" onClick={giveIde}>부여하기</button>
      </div>
    )
  }

  useEffect(() => {
    getIdeUrl();
  }, [])

  // 모달 관련
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [selectUser, setSelectUser] = useState("");




  // ide 관련 프롭스
  const StudentIDE = ({ props }) => {

    const clickItem = () => {
      handleShow()
      setSelectUser(props.user_id)
    }



    return (
      <tbody>
        <tr>
          <td>{props.user_name}</td>
          {props.server_url != null ?
            <td>
              {props.server_url}
            </td>
            :
            <td className={style.give_btn} onClick={clickItem}>
              <button type="button">부여하기</button>
            </td>
          }
        </tr>
      </tbody>
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

          <div className={style.ide_wrapper}>
            <h4>IDE 현황</h4>
            <div className={style.right_container_wrap_info_table}>
              <table className={style.setTable}>
                <thead>
                  <tr>
                    <td>이름</td>
                    <td>IDE URL</td>
                    <td></td>
                  </tr>
                </thead>
                {stuList.map((item, index) => (
                  <StudentIDE key={index} props={item} />
                ))}
              </table>
            </div>

            <Modal show={show} onHide={handleClose} style={{ top: "15%" }}>
              <Modal.Header closeButton>
                <Modal.Title>IDE 리스트</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <style>{`.modal-content { 
                  width: 600px;
                  max-height: 700px;
                  overflow-y: scroll;
                } `}</style>

                {ideUrlList.map((item, index) =>
                  <IDEItem key={index} props={item} index={index} />
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  닫기
                </Button>
              </Modal.Footer>
            </Modal>
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
