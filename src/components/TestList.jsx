import React, { useEffect, useState } from 'react';
import style from '../SCSS/pages/_testList.module.scss';
import Title from './Title';
import Profile from './Profile';
import axios from 'axios';

const TestList = () => {
  const [subList, setSubList] = useState([]); // 데이터를 저장할 상태 추가
  const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 여부를 나타내는 상태 추가

  useEffect(() => {
    getSubs();
  }, []);

  const getSubs = async () => {
    try {
      const response = await axios.get('http://localhost:8085/CodeBridge/sub/getsub');
      console.log("response.data", response.data);
      setSubList(response.data); // 데이터를 상태에 저장
      setIsLoading(false); // 데이터 로딩이 완료되면 isLoading을 false로 변경
    } catch (error) {
      console.error('데이터 가져오기에 실패했습니다.', error);
    }
  };

  const TestItem = ({ week, title }) => {
    return (
      <div className={style.test_item_box}>
        <div>
          <span>{week}주차</span>
          <span>{title}</span>
        </div>
        <div className={style.test_btn}>테스트</div>
      </div>
    );
  };

  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Title pageName="테스트" />
        <Profile showEditButton={false} />
      </div>

      <h2>테스트 관리</h2>
      <div className={style.test_item_wrapper}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          subList.map((item, index) => (
            <TestItem key={index} week={item.sub_num} title={item.sub_title} />
          ))
        )}
      </div>
    </div>
  );
};

export default TestList;
