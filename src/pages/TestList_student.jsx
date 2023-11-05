import React, { useEffect, useState } from 'react';
import style from '../SCSS/pages/_testList.module.scss';
import Profile from '../components/Profile';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashRightBox from "../components/DashRightBox";

const TestList_student = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // redux 값 뺴오기
  const combinedInfo = useSelector(state => state.combinedInfo);

  const [userInfo, setUserInfo] = useState([]);
  const [classInfo, setClassInfo] = useState([]);



  useEffect(() => {
    setUserInfo(combinedInfo.userInfo)
    setClassInfo(combinedInfo.classInfo)
  }, [combinedInfo]);


  const [isTested, setIsTested] = useState([]);



  const [subList, setSubList] = useState([]); // 데이터를 저장할 상태 추가


  const getSubs = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/CodeBridge/sub/getsub?class_num=${classInfo.class_num}`
      );
      const subNumString = response.data.map(item => item.sub_num).join(',');
      setSubList(response.data); // 데이터를 상태에 저장

      let obj = {
        sub_num: subNumString,
        user_id: sessionStorage.getItem("memberId")
      }
      try {
        const response = await axios.post(
          `${baseUrl}/CodeBridge/sub/istested`, obj
        );
        setIsTested(response.data);
      } catch (error) {

      }


    } catch (error) {
      console.error("데이터 가져오기에 실패했습니다.", error);
    }
  };


  useEffect(() => {
    getSubs();
  }, [classInfo]);

  const TestItem = ({ props }) => {
    return (
      <div className={style.item}>
        <div>
          <h5>{props.sub_title}</h5>
        </div>
        {props.tested == 1 ?
          (
            props.istested ?
              <button>
                테스트완료
              </button>
              :
              // <Link to={`/TestDetail?sub_num=${props.sub_num}`}>
              <Link to={`/TestReady?sub_num=${props.sub_num}`}>
                <button type="button" className={style.test_btn}>
                  테스트
                </button>
              </Link>
          )
          :
          <button type="button" className={style.test_btn_tested}>
            테스트
          </button>
        }
      </div>
    );
  };

  // 리스트 합치기
  const mergeLists = (subList, isTested) => {
    return subList.map(subItem => {
      const istestedItem = isTested.find(item => item.sub_num === subItem.sub_num);

      if (istestedItem) {
        return {
          ...subItem,
          istested: istestedItem.tested
        };
      }

      return subItem;
    });
  };

  // mergeLists 함수를 호출하여 두 리스트를 합칩니다.
  const mergedList = mergeLists(subList, isTested);




  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Profile />
        <div className={style.right_container_grid_box}>
          <h4>테스트 관리</h4>

          <div className={style.right_container_grid_box_detail}>
            {mergedList.map((item, index) => (
              <TestItem key={index} props={item} />
            ))}
          </div>
        </div>
      </div>
      <DashRightBox />
    </div>
  );
};

export default TestList_student;
