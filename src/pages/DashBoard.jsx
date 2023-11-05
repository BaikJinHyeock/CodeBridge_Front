import React, { useEffect, useRef, useState } from "react";
import Profile from "../components/Profile";
import DashRightBox from "../components/DashRightBox";
import style from "../SCSS/pages/_dashBoard.module.scss";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { updateClassInfo } from "../actions/classInfoActions";
import { updateTeacherInfo } from "../actions/teacherInfoActions";

const DashBoard = () => {

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


  const [toarray, setToarray] = useState([]);
  const [curriArray, setCurriArray] = useState([]);

  useEffect(() => {
    if (combinedInfo.classInfo && combinedInfo.classInfo.curriculum) {

      const curriculumArray = combinedInfo.classInfo.curriculum.match(/\[(\d+): ([^\]]+)]/g).map(item => {
        const match = item.match(/\[(\d+): ([^\]]+)]/);
        return [parseInt(match[1], 10), match[2]];
      });
      setCurriArray(curriculumArray)
      // setToarray(JSON.parse(res.data[0].curriculum));
      const selectedItems = curriculumArray.map((item) => item[0]);



      // const parsedCurriculum = JSON.parse(combinedInfo.classInfo.curriculum);
      // setToarray(parsedCurriculum);

      // const selectedItems = parsedCurriculum.map(item => item[1]);
      console.log('classSearch에서 아이템:', selectedItems);
      axios.post(`${baseUrl}/CodeBridge/sub/get-sub-list`, selectedItems)
        .then((res) => {
          setsubDetailList(res.data);
        }).catch((error) => {
          console.error();
        })


    }
  }, [combinedInfo]);






  // 모든 정보 조회
  const id = sessionStorage.getItem("memberId");

  const CurriList = ({ props, index, isSelected, onClick }) => {
    return (
      <div
        className={`${style.curriList_item} ${isSelected ? style.selected : ''}`}
        onClick={onClick}
      >
        {/* <div>
          <span>{props[0]}</span>
        </div> */}
        <div onClick={() => handleSubClick(index)}>
          <span>{props[1]}</span>
        </div>
      </div >
    );
  };


  const [selectedSubIndex, setSelectedSubIndex] = useState(0);


  // 클릭 이벤트 핸들러
  const handleSubClick = (index) => {
    setSelectedSubIndex(index);
  }

  const [subDetailList, setsubDetailList] = useState([]);

  //TodoList
  const [todoList, setTodoList] = useState([]);
  const [sequance, setSequance] = useState(null);
  const refTodoItem = useRef();

  useEffect(() => {
    let sequance = window.localStorage.getItem("sequance")
    if (sequance === null) {
      window.localStorage.setItem("sequance", "0")
      sequance = 0;
    }
    const handleSetInit = () => {
      window.localStorage.setItem("todoList", "[]")
      return "[]"
    }
    let todo = JSON.parse(window.localStorage.getItem("todoList") ?? handleSetInit());

    setTodoList(todo)
    setSequance(Number(sequance))
  }, [])

  const handleTodoAdd = (item) => {
    if (sequance === null) {
      return
    }
    if (!item.trim()) {
      alert("투두리스트를 작성해주세요.")
      return;
    }
    let todo = [...todoList];

    const newTodo = { tf: false, id: sequance + 1, text: item };
    todo.push(newTodo);

    window.localStorage.setItem("todoList", JSON.stringify(todo));
    window.localStorage.setItem("sequance", String(sequance + 1));

    setTodoList(todo);
    refTodoItem.current.value = "";

    setSequance(sequance + 1);

  }
  const handleTodoCheck = (tf, idx) => {
    let todo = [...todoList]
    todo[idx].tf = !tf

    window.localStorage.setItem("todoList", JSON.stringify(todo));
    setTodoList(todo);
  }
  const handleTodoDelete = (id) => {
    let todo = [...todoList]
    todo = todo.filter((val) => val.id !== id);

    window.localStorage.setItem("todoList", JSON.stringify(todo));
    setTodoList(todo);
  }

  console.log("확인" + window.localStorage.getItem("todoList"));
  const todo = window.localStorage.getItem("todoList");

  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        {/* <Title pageName="Dash Board" /> */}
        <Profile />

        <div className={style.right_container_todoList}>
          <h4>To do List</h4>
          <div className={style.right_container_main}>
            <div className={style.right_container_todo_Top}>

              <div className={style.right_container_todo_Top_add}>
                <input type="text" placeholder="할 일을 입력해주세요." ref={refTodoItem} />
                <div onClick={() => handleTodoAdd(refTodoItem.current.value)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className={style.right_container_todo_list}>
              {todoList.map((val, idx) =>
                <div className={style.todoItem} key={idx}>
                  <div className={style.todoCheckBox} onClick={() => handleTodoCheck(val.tf, idx)}>
                    <div className={style.checkIcon}>
                      {val.tf ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                        </svg> : ""
                      }
                    </div>
                    <span>{val.text}</span>
                  </div>
                  <div className={style.deleteBox} onClick={() => handleTodoDelete(val.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={style.main_content}>
          <div className={style.main_content_left}>
            <h4>커리큘럼</h4>
            {curriArray && curriArray.map((item, index) => {
              const isSelected = index === selectedSubIndex;

              return (
                <CurriList key={index} props={item} index={index} isSelected={isSelected}
                  onClick={() => handleSubClick(index)} />
              );
            })}
          </div>

          <div className={style.main_content_right}>
            <h4>커리큘럼 미리보기</h4>
            {selectedSubIndex !== null && (
              <div>
                {subDetailList[selectedSubIndex] != null &&
                  <span
                    dangerouslySetInnerHTML={{ __html: subDetailList[selectedSubIndex].sub_content }}>

                  </span>
                }
              </div>
            )}
          </div>
        </div>
      </div>
      <DashRightBox />
    </div>
  );
};

export default DashBoard;
