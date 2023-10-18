import React, { useEffect, useState } from "react";
import Title from "./Title";
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
    if (name1.length == 1 || name1.length > 5) {
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
        user_name: name1,
      };
      const response = await axios.post(
        "http://localhost:8085/CodeBridge/Member/memcheck",
        mem
      );
      if (response.data == "Y") {
        window.location.href = "/";
        alert("이름수정완료!");
      }
    } else {
      return alert("잘못입력된 정보가 있습니다.");
    }
  };

  const nickcheck = async (e) => {
    if (name1.length == 1 || name1.length > 10) {
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
        user_nick: nick,
      };
      const response = await axios.post(
        "http://localhost:8085/CodeBridge/Member/memcheck",
        mem
      );
      if (response.data == "Y") {
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
      setphoneCheckMsg("휴대폰번호 형식에 어긋납니다.");
      setCheck4(0);
    } else {
      setphoneCheckMsg("옳바른 휴대폰번호 형식입니다.");
      setCheck4(1);
    }
  };
  const phone_edit = async (e) => {
    e.preventDefault();
    if (check4 === 1) {
      let mem = {
        user_phone: phone,
      };
      const response = await axios.post(
        "http://localhost:8085/CodeBridge/Member/memcheck",
        mem
      );
      if (response.data == "Y") {
        window.location.href = "/";
        alert("번호수정완료!");
      }
    } else {
      return alert("잘못입력된 정보가 있습니다.");
    }
  };

  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Title pageName="계정 관리" />
        <Profile showEditButton={true} />

        <div className={style.third_box}>
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
                        {/* <p>{username}</p> */}
                        <p>선동욱</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </div>
                      <div className={style.setTable_userId_editId}>
                        <form onSubmit={name_deit}>
                          <div class="input-group mb-3">
                            <input
                              type="text"
                              class="form-control"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-default"
                              value={name1}
                              onChange={(e) => setName1(e.target.value)}
                              onBlur={namecheck}
                            />
                            <span>{nameCheckMsg}</span>
                            <div>
                              <button type="button">취소</button>
                              <button
                                type="submit"
                                className={style.join_button}
                              >
                                수정 완료
                              </button>
                            </div>
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
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </div>
                      <div className={style.setTable_userPw_editId}>
                        <form onSubmit={nick_edit}>
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
                          </div>
                          <span>{nickCheckMsg}</span>

                          <div>
                            <button type="button">취소</button>
                            <button type="submit" className={style.join_button}>
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
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </div>
                      <div className={style.setTable_userPw_editId}>
                        <form>
                          <div class="input-group mb-3">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="새 비밀번호"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-default"
                            />
                          </div>
                          <div class="input-group mb-3">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="비밀번호 확인"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-default"
                            />
                          </div>
                          <div>
                            <button type="button">취소</button>
                            <button type="submit" className={style.join_button}>
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
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </div>
                      <div className={style.setTable_userNum_editId}>
                        <form onSubmit={phone_edit}>
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
                          </div>
                          <span>{phoneCheckMsg}</span>
                          <button type="submit" className={style.join_button}>
                            번호수정
                          </button>
                        </form>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>계정 삭제</td>
                  <td>
                    <button type="button">삭제</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className={style.buttons}>
              <button type="button">취소</button>
              <button type="submit">변경 완료</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetInfo;
