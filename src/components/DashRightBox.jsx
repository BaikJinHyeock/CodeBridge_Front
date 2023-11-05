import React, { useEffect, useState } from "react";
import style from "../SCSS/pages/_dashRightBox.module.scss";
import { useSelector } from "react-redux";

const DashRightBox = () => {

  // redux 값 뺴오기
  const combinedInfo = useSelector(state => state.combinedInfo);

  const [teacherInfo, setTeacherInfo] = useState([]);
  const [classInfo, setClassInfo] = useState([]);


  useEffect(() => {
    setTeacherInfo(combinedInfo.teacherInfo)
    setClassInfo(combinedInfo.classInfo)
  }, [combinedInfo]);



  return (
    <div className={style.right_wrap_container}>
      <div className={style.content_box1}>
        <h4>담당 강사님</h4>

        <div className={style.profile_box}>
          <img
            src={teacherInfo.user_pic}
          />
        </div>
        <p>{teacherInfo.user_name}</p>
        <span>교육기간 <br/>{classInfo.class_startdate} ~ {classInfo.class_enddate}</span>
      </div>

      <div className={style.content_box2}>
        <h4>출결사항</h4>
        <div className={style.info_box_attend}>
          <div>
            <span>출석</span>
            <p>2</p>
          </div>
          <div>
            <span>결석</span>
            <p>0</p>
          </div>
          <div>
            <span>지각</span>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashRightBox;
