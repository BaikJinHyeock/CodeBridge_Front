import React from "react";
import DashLeftBox from "./DashLeftBox";

import style from "../SCSS/pages/_setInfo.module.scss";
// import "bootstrap/dist/css/bootstrap.min.css";

const SetInfo = () => {
  return (
    <div className={style.wrap_container}>
      <DashLeftBox />
      <div className={style.right_container}>
        <div className={style.first_box}>
          <h2>계정관리</h2>
          <div>
            <p>출석, 결석, 지각</p>
          </div>
        </div>

        <div className={style.second_box}>
          <p>선동욱님 화녕합미다</p>
          <h1>데이터 디자ㅣㄴ 양성 과정</h1>
        </div>

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
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetInfo;
