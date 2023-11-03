import React, { useEffect, useState } from 'react'
import style from "../SCSS/pages/_classList.module.scss"
import axios from 'axios';
import { Link } from 'react-router-dom';



const ClassList = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [classlist, setClasslist] = useState([]);

  useEffect(() => {
    getClass();
  }, [])

  const getClass = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/CodeBridge/class/get-class-list`);
      console.log('조회 후 데이터', response.data);
      setClasslist(response.data)
    } catch (error) {

    }
  }

  const ClassContent = ({ props }) => {
    return (
      <div className={style.wrap_container_main_box}>
        <div className={style.wrap_container_main_box_text}>
          <h1>{props.class_title}</h1>
          <span>교육대상 | {props.class_target}</span>
          <span>교육기간 | {props.class_startdate} ~ {props.class_enddate}</span>
        </div>
        <div className={style.wrap_container_main_box_img}>
          <img src={props.img_url} alt="#" />
        </div>
      </div>
    );
  };


  return (
    <div className={style.wrap_container}>
      <div className={style.main_banner}>
        <div className={style.main_banner_bg}></div>
        <div className={style.banner_text}>
          <h1>모집 중인 교육과정</h1>
          <h5> IT트렌드를 반영한, 다년간 직접 연구한<br />
            기초부터 실무까지 탄탄하게 배울 수 있는 교육</h5>
        </div>
      </div>

      <div className={style.wrap_container_main}>
        <h4>전체</h4>

        {classlist.map((item, index) =>
          <Link to={`/ClassDetail?class_num=${item.class_num}`}>
            <ClassContent key={index} props={item} />
          </Link>
        )}

      </div>
    </div>
  )
}

export default ClassList