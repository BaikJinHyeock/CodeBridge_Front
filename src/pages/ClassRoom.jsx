import React, { useEffect, useRef, useState } from "react";
import style from "../SCSS/pages/_classRoom.module.scss";
import axios from 'axios';
import { useSelector } from "react-redux";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import Badge from 'react-bootstrap/Badge';
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export const ClassRoom = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // redux 값 뺴오기
  const combinedInfo = useSelector(state => state.combinedInfo);

  const [userInfo, setUserInfo] = useState([]);
  const [classInfo, setClassInfo] = useState([]);
  const [stuList, setStuList] = useState([]);

  const [teacherLiveInput, setTeacherLiveInput] = useState();
  const [teacherLive, setTeacherLive] = useState();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const class_num = params.get("class_num");

  // 선생님 vscode주소 가져오기
  const [teacherUrl, setTeacherUrl] = useState("");
  const getTeacherIDE = async () => {
    try {
      const res = await axios.get(`${baseUrl}/CodeBridge/member/memberInfoTeacher?user_id=${classInfo.user_id}`);
      setTeacherUrl(res.data[0].server_url);
    } catch (error) {

    }
  }


  useEffect(() => {
    setUserInfo(combinedInfo.userInfo)
    setClassInfo(combinedInfo.classInfo)
  }, [combinedInfo]);

  useEffect(() => {
    getStuList();
    getTeacherIDE();
  }, [classInfo])

  // 반 학생 리스트 긁어오기
  const getStuList = async () => {
    try {
      const res = await axios.get(`${baseUrl}/CodeBridge/class/getClassStu?class_num=${classInfo.class_num}`);
      setStuList(res.data)
    } catch (error) {
    }
  }

  // 학생 정보 컴포넌트
  const StudentItem = ({ props }) => {
    const handleOpenLink = () => {
      window.open(props.server_url);
      setReqStuName("");
    }

    const isHelpRequested = reqStuName === props.user_name;

    return (
      <tr>
        <td onClick={handleOpenLink}>
          {props.user_name}
        </td>
        <td>
          {isHelpRequested &&
            <Badge bg="danger">Help</Badge>
          }
        </td>
      </tr>
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
    const socket = new SockJS(`${baseUrl}/CodeBridge/websocket`);
    stompClient = Stomp.over(socket);
    return new Promise((resolve, reject) => {
      stompClient.connect({}, () => {
        if (!isSubscribed) { // 이전에 구독하지 않았다면
          stompClient.subscribe('/topic/public', (message) => {
            const messageData = JSON.parse(message.body);
            addMessage(messageData);
          });
          // 도움 요청 응답을 받아서 studentName 상태에 저장
          stompClient.subscribe('/topic/helpResponse', (message) => {
            setReqStuName(message.body); // 받은 값을 studentName 상태에 저장
          });
          // 선생 라이브 주소
          stompClient.subscribe('/topic/liveResponse', (message) => {
            setTeacherLive(message.body)
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
    if (message === null || message.trim() === "") {
      // 메시지가 비어있거나 null이면 함수 실행을 막음
      return;
    }
    setMessage("");
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


  const requestHelp = async () => {
    try {
      await initializeWebSocket(); // 소켓 연결 기다리기
      stompClient.send('/app/chat.requestHelp', {}, sessionStorage.getItem("user_name"));
    } catch (error) {
      console.error(error);
    }
  };

  const sendTeacherLive = async () => {
    handleClose2();
    try {
      await initializeWebSocket(); // 소켓 연결 기다리기
      stompClient.send('/app/chat.teacherLive', {}, teacherLiveInput);
    } catch (error) {

    }
  }

  // 강사화면 메서드
  const clickTeacher = () => {
    window.open(teacherLive);
  }

  // 모달 관련
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  // 모달 관련
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
  };

  // 채팅 컴포넌트
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight;
    }
  }, [messages])

  const LiveChatTest = () => {

    return (
      <div className={style.wrap_container}>
        <div className={style.wrap_container_top}>
          {messages.map((message, index) => (
            <div key={index} className={style.wrap_container_top_detail}>
              <p className={style.wrap_container_top_detail_nick}><span>{message.nick}</span> ({message.name})</p>
              <span className={style.wrap_container_top_content}>{message.content}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  console.log('user타입 확인', userInfo);

  return (
    <>
      <div className={style.main_container}>
        <div className={style.left_container_wrapper}>
          {userInfo.user_type == 1 ?
            <iframe src={`${userInfo.server_url}?folder=/home/smhrd/class/ClassRoomTeacher`}></iframe>
            :
            <iframe src={`${userInfo.server_url}?folder=/home/smhrd/class/ClassRoom`}></iframe>
          }
        </div>
        <div className={style.main_container_right}>
          <div className={style.main_container_right_buttons}>
            {userInfo.user_type == 0 ?
              <>
                {teacherLive === undefined ?
                  <button type="button" onClick={clickTeacher} disabled={teacherLive === undefined} className={style.main_container_right_buttons_first}>강사화면</button>
                  :
                  <button type="button" onClick={clickTeacher} className={style.main_container_right_buttons_first}>강사화면</button>
                }
                <button type="button" className={style.stu_help_btn} onClick={requestHelp}>도움요청</button>
              </>
              :
              <>
                {teacherLive === undefined ?
                  <button type="button" onClick={handleShow2} className={style.main_container_right_buttons_first}>공유시작</button>
                  :
                  <button type="button" onClick={handleShow2}>공유중</button>
                }
                <div className={style.teacher_help_btn_wrapper}>
                  <button type="button" onClick={handleShow} className={style.teacher_help_btn_wrapper_help}>도움주기</button>
                  {reqStuName &&
                    <div className={style.teacher_help_btn_wrapper_circle}>
                      <span>HELP!</span>
                    </div>
                  }
                </div>
              </>
            }
          </div>




          <Modal show={show2} onHide={handleClose2} style={{ top: "15%" }}>
            <Modal.Header closeButton>
              <Modal.Title>주소 입력</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <style>{`.modal-content { 
                  width: 600px;
                  max-height: 700px;
                  overflow-y: auto;
                } `}</style>

              <input
                type="text"
                placeholder="주소 입력"
                className={style.start_live_input}
                value={teacherLiveInput}
                onChange={(e) => setTeacherLiveInput(e.target.value)}
              />
              {/* <button onClick={sendTeacherLive}>Send</button> */}

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={sendTeacherLive}>
                적용하기
              </Button>
            </Modal.Footer>
          </Modal>






          <Modal show={show} onHide={handleClose} style={{ top: "15%" }}>
            <Modal.Header closeButton>
              <Modal.Title>IDE 리스트</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <style>{`.modal-content { 
                  width: 600px;
                  max-height: 700px;
                  overflow-y: auto;
                } `}</style>
              <table className={style.ide_table}>
                <thead>
                  <tr>
                    <td>이름</td>
                    <td>도움요청</td>
                  </tr>
                </thead>
                <tbody>
                  {stuList.map((item, index) =>
                    <StudentItem key={index} props={item} />
                  )}
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                닫기
              </Button>
            </Modal.Footer>
          </Modal>


          <div className={style.main_container_right_chat} ref={scrollRef}>
            <div className={style.main_container_right_chat_detail}>
              <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }
                }}
              />
              <button onClick={sendMessage} type="button">Send</button>
            </div>
            {/* LiveChatTest 컴포넌트를 직접 여기에 넣습니다. */}
            <LiveChatTest />
          </div>
        </div>
      </div>

      <div className={style.mobile}>
        <div>
          <h1>웹 해상도에서만 서비스 제공 중</h1>
          <p>
            죄송합니다. 현재 CodeBridge 서비스는 모바일 해상도에서 이용할 수 없습니다.
            데스크탑에서 접속해주시기 바랍니다.
          </p>
        </div>
      </div>
    </>

  );
};

export default ClassRoom;
