import React, { useEffect, useState } from 'react';
import style from '../SCSS/pages/_testList.module.scss';
import Profile from './Profile';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashRightBox from "./DashRightBox";



const TestList = () => {
  const [subList, setSubList] = useState([]); // 데이터를 저장할 상태 추가

  useEffect(() => {
    getSubs();
  }, []);

  const getSubs = async () => {
    console.log('반 번호 확인', classInfo);
    try {
      const response = await axios.get(
        "http://localhost:8085/CodeBridge/sub/getsub"
      );
      console.log("response.data", response.data);
      setSubList(response.data); // 데이터를 상태에 저장
    } catch (error) {
      console.error("데이터 가져오기에 실패했습니다.", error);
    }
  };

  // 반 정보 받아오기
  const classInfo = useSelector(state => state.classInfo);

  const TestItem = ({ props }) => {
    return (
      <div className={style.item}>
        <div>
          <h5>{props.sub_title}</h5>
        </div>
        <a href={`/TestDetail?sub_num=${props.sub_num}`}>
          <button type="button" className={style.test_btn}>
            테스트
          </button>
        </a>
      </div>
    );
  };

  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Profile />
        <div className={style.right_container_grid_box}>
          <h4>테스트 관리</h4>

          <div className={style.right_container_grid_box_detail}>
            {subList.map((item, index) => (
              <TestItem key={index} props={item} />
            ))}
          </div>
        </div>
      </div>
      <DashRightBox />
    </div>
  );
};

export default TestList;
