import React, { useEffect, useState } from "react";
import Profile from "./Profile";

import style from "../SCSS/pages/_setInfo.module.scss";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

const SetInfo = () => {
  const [password, setPassword] = useState("");
  const [password_check, setPassword_check] = useState("");
  const [name1, setName1] = useState("");
  const [nick, setNick] = useState("");
  const [phone, setPhone] = useState("");
  const [idErrMsg, setIdErrMsg] = useState(""); // 아이디(이메일)형식 에러 메세지
  const [idCheckMsg, setIdCheckMsg] = useState(""); // 아이디 사용가능 메세지
  const [pwErrMsg, setPwErrMsg] = useState(""); // 패스워드형식 에러 메세지
  const [pwCheckMsg, setPwCheckMsg] = useState(""); // 패스워드 일치 사용가능 메세지
  const [nameCheckMsg, setNameCheckMsg] = useState(""); // 패스워드 일치 사용가능 메세지
  const [nickCheckMsg, setNickCheckMsg] = useState(""); // 패스워드 일치 사용가능 메세지
  const [phoneCheckMsg, setphoneCheckMsg] = useState(""); // 휴대폰번호 사용가능 메세지

  const [check1, setCheck1] = useState("0");
  const [check2, setCheck2] = useState("0");
  const [check3, setCheck3] = useState("0");
  const [check4, setCheck4] = useState("0");
  const [check5, setCheck5] = useState("0");
  const [check6, setCheck6] = useState("0");

  const [username, setUsername] = useState("");
  const [userphone, setUserphone] = useState("");
  const [usernick, setUsernick] = useState("");

  const id = sessionStorage.getItem("memberId");
  useEffect(() => {
    if (id) {
      memberSearching();
    }
  }, []);

  // 회원정보 조회
  const memberSearching = async () => {
    console.log("로그인이 되어있나", id);
    let mem = {
      user_id: id,
    };
    const response = await axios.post(
      "http://localhost:8085/CodeBridge/Member/memcheck",
      mem
    );
    console.log(response.data[0].user_name);
    setUsername(response.data[0].user_name);
    setUserphone(response.data[0].user_phone);
    setUsernick(response.data[0].user_nick);
  };

  const namecheck = async (e) => {
    if (name1.length === 1 || name1.length > 5) {
      setNameCheckMsg("이름을 정확하게 입력해주세요");
      setCheck5(0);
    } else {
      setNameCheckMsg("");
      setCheck5(1);
    }
  };
  const name_deit = async (e) => {
    e.preventDefault();
    if (check5 === 1) {
      let mem = {
        user_id: id,
        user_name: name1,
      };
      const response = await axios.post(
        "http://localhost:8085/CodeBridge/Member/nameedit",
        mem
      );
      if (response.data === 1) {
        window.location.href = "/";
        alert("이름수정완료!");
      }
    } else {
      return alert("잘못입력된 정보가 있습니다.");
    }
  };

  const nickcheck = async (e) => {
    if (name1.length === 1 || name1.length > 10) {
      setNickCheckMsg("닉네임을 입력해주세요");
      setCheck6(0);
    } else {
      setNickCheckMsg("");
      setCheck6(1);
    }
  };
  const nick_edit = async (e) => {
    e.preventDefault();
    if (check6 === 1) {
      let mem = {
        user_id: id,
        user_nick: nick,
      };
      const response = await axios.post(
        "http://localhost:8085/CodeBridge/Member/nickedit",
        mem
      );
      if (response.data === 1) {
        window.location.href = "/";
        alert("닉네임수정완료!");
      }
    } else {
      return alert("잘못입력된 정보가 있습니다.");
    }
  };

  const phonecheck = async (e) => {
    const phcheck = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!phcheck.test(e.target.value)) {
      setphoneCheckMsg("번호를 올바르게 입력해주세요.");
      setCheck4(0);
    } else {
      setphoneCheckMsg("");
      setCheck4(1);
    }
  };
  const phone_edit = async (e) => {
    e.preventDefault();
    if (check4 === 1) {
      let mem = {
        user_id: id,
        user_phone: phone,
      };
      const response = await axios.post(
        "http://localhost:8085/CodeBridge/Member/phoneedit",
        mem
      );
      if (response.data === 1) {
        window.location.href = "/";
        alert("번호수정완료!");
      }
    } else {
      return alert("잘못입력된 정보가 있습니다.");
    }
  };

  const pw1check = async (e) => {
    const pwch = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/;

    if (!pwch.test(e.target.value)) {
      setPwErrMsg("비밀번호는 6 ~ 20자로 영문, 숫자를 조합해서 사용하세요.");
      setCheck2(0);
    } else {
      setPwErrMsg("사용 가능한 비밀번호 입니다.");
      setCheck2(1);
    }
  };

  const pw2check = async (e) => {
    if (password != password_check) {
      setPwCheckMsg("비밀번호가 일치하지 않습니다.");
      setCheck3(0);
    } else if (password.length > 1 && password == password_check) {
      setPwCheckMsg("비밀번호가 일치합니다.");
      setCheck3(1);
    }
  };

  const pw_edit = async (e) => {
    e.preventDefault();
    if (check2 === 1 && check3 === 1) {
      let mem = {
        user_id: id,
        user_pw: password,
      };
      const response = await axios.post(
        "http://localhost:8085/CodeBridge/Member/passwordedit",
        mem
      );
      if (response.data === 1) {
        window.location.href = "/";
        alert("비밀번호수정완료!");
      }
    } else {
      return alert("잘못입력된 정보가 있습니다.");
    }
  };

  const idDelete = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (confirmDelete) {
      let mem = {
        user_id: id,
      };
      const response = await axios.post(
        "http://localhost:8085/CodeBridge/Member/iddelete",
        mem
      );
      if (response.data === 1) {
        sessionStorage.removeItem("memberId");
        window.location.href = "/";
        alert("회원삭제완료!");
      }
    } else {
      return alert("회원삭제실패!");
    }
  };

  // 수정버튼 클릭시 div박스 display : flex 변경함수
  const [onButton, setOnButton] = useState("");
  const onId = () => {
    setOnButton("userId");
  };
  const onNick = () => {
    setOnButton("userNick");
  };
  const onPw = () => {
    setOnButton("userPw");
  };
  const onNum = () => {
    setOnButton("userNum");
  };

  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Profile showEditButton={true} />

        <div className={style.main_content}>
          <h4>기본 정보</h4>
          <p>사용자의 정보를 수정할 수 있습니다.</p>
          <div className={style.reWrite}>
            <table className={style.setTable}>
              <tbody>
                <tr>
                  <td>이름</td>
                  <td>
                    <div className={style.setTable_userId}>
                      <div className={style.setTable_userId_originId}>
                        <p>{username}</p>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                          onClick={onId}
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </div>
                      <div className={style.setTable_userId_editId}>
                        <form
                          onSubmit={name_deit}
                          className={onButton === "userId" ? style.active : ""}
                        >
                          <div class="input-group mb-3">
                            <input
                              type="text"
                              class="form-control"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-default"
                              placeholder="새 이름"
                              value={name1}
                              onChange={(e) => setName1(e.target.value)}
                              onBlur={namecheck}
                            />
                            <span>{nameCheckMsg}</span>
                          </div>
                          <div>
                            <button
                              type="submit"
                              className={style.accept_button}
                            >
                              수정 완료
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>닉네임</td>
                  <td>
                    <div className={style.setTable_userPw}>
                      <div className={style.setTable_userPw_originId}>
                        <p>{usernick}</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                          onClick={onNick}
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </div>
                      <div className={style.setTable_userPw_editId}>
                        <form
                          onSubmit={nick_edit}
                          className={
                            onButton === "userNick" ? style.active : ""
                          }
                        >
                          <div class="input-group mb-3">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="새 닉네임"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-default"
                              value={nick}
                              onChange={(e) => setNick(e.target.value)}
                              onBlur={nickcheck}
                            />
                            <span>{nickCheckMsg}</span>
                          </div>

                          <div>
                            <button
                              type="submit"
                              className={style.accept_button}
                            >
                              수정 완료
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>비밀번호</td>
                  <td>
                    <div className={style.setTable_userPw}>
                      <div className={style.setTable_userPw_originId}>
                        <p>비밀번호를 재설정합니다.</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                          onClick={onPw}
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </div>
                      <div className={style.setTable_userPw_editId}>
                        <form
                          onSubmit={pw_edit}
                          className={onButton === "userPw" ? style.active : ""}
                        >
                          <div class="input-group mb-3">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="새 비밀번호"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-default"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              onBlur={pw1check}
                            />
                            <span>{pwErrMsg}</span>
                          </div>
                          <div class="input-group mb-3">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="비밀번호 확인"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-default"
                              value={password_check}
                              onChange={(e) =>
                                setPassword_check(e.target.value)
                              }
                              onBlur={pw2check}
                            />
                            <span>{pwCheckMsg}</span>
                          </div>
                          <div>
                            <button
                              type="submit"
                              className={style.accept_button}
                            >
                              수정 완료
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>연락처</td>
                  <td>
                    <div className={style.setTable_userNum}>
                      <div className={style.setTable_userNum_originId}>
                        <p>{userphone}</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                          onClick={onNum}
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </div>
                      <div className={style.setTable_userNum_editId}>
                        <form
                          onSubmit={phone_edit}
                          className={onButton === "userNum" ? style.active : ""}
                        >
                          <div class="input-group mb-3">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="휴대폰 번호"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-default"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              onBlur={phonecheck}
                            />
                            <span>{phoneCheckMsg}</span>
                          </div>
                          <div>
                            <button
                              type="submit"
                              className={style.accept_button}
                            >
                              수정 완료
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>계정 삭제</td>
                  <td>
                    <button type="button" onClick={idDelete}>
                      삭제
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className={style.buttons}>
              <button type="submit">변경 완료</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetInfo;
