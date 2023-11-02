import React, { useEffect, useState } from "react";
import style from "../SCSS/pages/_classRoom.module.scss";
import axios from 'axios';
import { useSelector } from "react-redux";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

export const ClassRoom = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // redux 값 뺴오기
  const combinedInfo = useSelector(state => state.combinedInfo);

  const [userInfo, setUserInfo] = useState([]);
  const [classInfo, setClassInfo] = useState([]);
  const [stuList, setStuList] = useState([]);

  useEffect(() => {
    setUserInfo(combinedInfo.userInfo)
    setClassInfo(combinedInfo.classInfo)
  }, [combinedInfo]);

  useEffect(() => {
    getStuList();
  }, [classInfo])

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

  // 학생 정보 컴포넌트
  const StudentItem = ({ props }) => {
    const handleOpenLink = () => {
      window.open('http://59.0.249.27:8071', '_blank');
      setReqStuName("");
    }

    const isHelpRequested = reqStuName === props.user_name;

    return (
      <div>
        <div>
          학생이름 :
          <span onClick={handleOpenLink} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            {props.user_name}
          </span>
          {isHelpRequested && <span style={{ marginLeft: '5px', color: 'red' }}>도움!</span>}
        </div>
      </div>
    );
  }

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');


  let stompClient = null;

  useEffect(() => {
    if (!stompClient || !stompClient.connected) {
      initializeWebSocket();
    }
  }, []);

  // let isSubscribed = false;
  const [isSubscribed, setIsSubscribed] = useState(false);

  const initializeWebSocket = async () => {
    if (stompClient && stompClient.connected) return; // 이미 연결된 상태면 무시

    const socket = new SockJS("http://localhost:8085/CodeBridge/websocket");
    stompClient = Stomp.over(socket);

    return new Promise((resolve, reject) => {

      stompClient.connect({}, () => {
        if (!isSubscribed) { // 이전에 구독하지 않았다면
          stompClient.subscribe('/topic/public', (message) => {
            console.log('여기 몇번호출');
            const messageData = JSON.parse(message.body);
            console.log('messageData 확인', messageData);
            addMessage(messageData);
          });

          // 도움 요청 응답을 받아서 studentName 상태에 저장
          stompClient.subscribe('/topic/helpResponse', (message) => {
            console.log('도움요청 데이터', message.body);
            // const messageData = JSON.parse(message.body);
            setReqStuName(message.body); // 받은 값을 studentName 상태에 저장
          });

          setIsSubscribed(true)

        }
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  };

  const addMessage = (messageData) => {
    if (!messages.some(message => message.messageId === messageData.messageId)) {
      setMessages(prevMessages => [...prevMessages, messageData]);
    }
  };

  const sendMessage = async () => {
    try {
      await initializeWebSocket(); // 소켓 연결 기다리기

      const messageData = {
        name: sessionStorage.getItem("user_name"),
        nick: sessionStorage.getItem("user_nick"),
        content: message,
        messageId: Date.now()
      };

      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(messageData));
    } catch (error) {
      console.error(error);
    }
  };

  const [reqStuName, setReqStuName] = useState(null);

  console.log('reqStuName 확인', reqStuName);

  const requestHelp = async () => {
    try {
      await initializeWebSocket(); // 소켓 연결 기다리기

      console.log('도움요청 진입');

      stompClient.send('/app/chat.requestHelp', {}, sessionStorage.getItem("user_name"));



    } catch (error) {
      console.error(error);
    }
  };



  // 채팅 컴포넌트
  const LiveChatTest = () => {

    return (
      <div className={style.wrap_container}>
        <div className={style.wrap_container_top}>
          {messages.map((message, index) => (
            <div key={index} className={style.wrap_container_top_detail}>
              <p>
                <span className={style.wrap_container_top_detail_nick}>{message.nick}({message.name})</span>
              </p>
              <p className={style.wrap_container_top_content}>{message.content}</p>
            </div>
          ))}
        </div>
        <div className={style.wrap_container_bottom}>

        </div>
      </div>
    );
  }

  return (
    <div className={style.main_container}>
      {userInfo.user_type == 0 ?
        <div className={style.left_container_wrapper}>
          <iframe src={`${userInfo.server_url}`}></iframe>
        </div>
        :
        <div className={style.left_container_wrapper}>
          {stuList.map((item, index) =>
            <StudentItem key={index} props={item} />
          )}
        </div>
      }
      <div className={style.main_container_right}>
        <div className={style.main_container_right_buttons}>
          <button type="button">화면공유</button>
          <button type="button" onClick={requestHelp}>도움요청</button>
        </div>
        <div className={style.main_container_right_chat}>
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
          {/* LiveChatTest 컴포넌트를 직접 여기에 넣습니다. */}
          <LiveChatTest />
        </div>
      </div>
    </div>
  );
};

export default ClassRoom;
