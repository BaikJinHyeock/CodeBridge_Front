import React, { useEffect, useState } from "react";
import style from "../SCSS/pages/_dashRightBoxTeacher.module.scss";
import axios from 'axios'
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DashRightBoxTeacher = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // redux 값 뺴오기
  const combinedInfo = useSelector(state => state.combinedInfo);

  const [teacherInfo, setTeacherInfo] = useState([]);
  const [classInfo, setClassInfo] = useState([]);


  useEffect(() => {
    setTeacherInfo(combinedInfo.teacherInfo)
    setClassInfo(combinedInfo.classInfo)
  }, [combinedInfo]);


  useEffect(() => {
    getStuList();
  }, [classInfo])

  const [stuList, setStuList] = useState([]);

  // 반 학생 리스트 긁어오기
  const getStuList = async () => {
    console.log('반번호 ? ', classInfo.class_num);
    try {
      const res = await axios.get(`${baseUrl}/CodeBridge/class/getClassStu?class_num=${classInfo.class_num}`);
      console.log('받아온 학생 리스트 확인', res.data);
      setStuList(res.data)
    } catch (error) {
    }
  }

  // 학생 모든 정보 불러오기


  const StudentList = ({ props }) => {
    return (
      <li onClick={handleShow}>
        {props.user_name}
        <p>{props.user_id}</p>
      </li>
    );
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);


  }



  return (
    <div className={style.right_wrap_container}>
      <div className={style.content_box1}>
        <span>강의실 정보</span>
        <h4>데이터디자인 엔지니어 양성과정</h4>
        <p>교육기간 | 2023. 04. 27 ~ 11. 27</p>
      </div>

      <div className={style.content_box2}>
        <span>
          학생 정보{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#06aed5"
            class="bi bi-question-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
          </svg>
          <p>학생 이름 클릭 시 학생의 상세정보를 확인할 수 있습니다.</p>
        </span>

        <ul className={style.content_box2_list}>
          {stuList.map((item, index) =>
            <StudentList key={index} props={item} />
          )}
        </ul>

        <Modal show={show} onHide={handleClose}>
          <style>{`.modal-dialog {top : 15%} `}</style>
          <style>{`.modal-content {width : 600px} `}</style>
          <Modal.Header closeButton>
            <Modal.Title>학생정보</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>학생 이름</p>
            <p>학생 아이디</p>
            <p>ide url</p>








          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default DashRightBoxTeacher;
