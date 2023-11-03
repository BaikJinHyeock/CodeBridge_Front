import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import style from "../SCSS/pages/_setInfo.module.scss";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { storage } from "../Firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import QuillCompo_test from "../components/QuillCompo_test";
import { useSelector } from "react-redux";

const SetInfo = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const quillValue = useSelector((state) => state.quill.quillValue);

  console.log('퀼 밸류 확인', quillValue);

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

  const id = sessionStorage.getItem("memberId");

  const [infoList, setInfoList] = useState([]);

  useEffect(() => {
    if (id) {
      memberSearching();
    }
  }, []);

  // 회원정보 조회
  const memberSearching = async () => {
    console.log("로그인이 되어있나", id);
    const res = await axios.get(`${baseUrl}/CodeBridge/member/memberInfoTeacher?user_id=${id}`);
    console.log('조회 후 데이터', res.data[0]);
    setInfoList(res.data[0]);
  };

  console.log('인포리스트 확인', infoList.user_name);

  const koreanVowelRegex = /^[ㅏ-ㅣ]/;
  // const namecheck = async (e) => {
  //   if (name1.length < 2 || name1.length > 5 || koreanVowelRegex.test(name1[0])) {
  //     setNameCheckMsg("이름을 정확하게 입력해주세요");
  //     setCheck5(0);
  //   } else {
  //     setNameCheckMsg("");
  //     setCheck5(1);
  //   }
  // };
  // const name_deit = async (e) => {
  //   e.preventDefault();
  //   if (check5 === 1) {
  //     let mem = {
  //       user_id: id,
  //       user_name: name1,
  //     };
  //     const response = await axios.post(
  //       "http://localhost:8085/CodeBridge/member/nameedit",
  //       mem
  //     );
  //     if (response.data === 1) {
  //       window.location.href = "/";
  //       alert("이름이 성공적으로 수정되었습니다.");
  //     }
  //   } else {
  //     return alert("잘못입력된 정보가 있습니다.");
  //   }
  // };

  const nickcheck = async (e) => {
    if (nick.length < 2 || nick.length > 10 || koreanVowelRegex.test(nick[0])) {
      setNickCheckMsg("닉네임을 제대로 입력해주세요");
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
        `${baseUrl}/CodeBridge/member/nickedit`,
        mem
      );
      if (response.data === 1) {
        window.location.href = "/";
        alert("닉네임이 성공적으로 수정되었습니다.");
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
        `${baseUrl}/CodeBridge/member/phoneedit`,
        mem
      );
      if (response.data === 1) {
        window.location.href = "/";
        alert("휴대폰 번호가 성공적으로 수정되었습니다.");
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
        `${baseUrl}/CodeBridge/member/passwordedit`,
        mem
      );
      if (response.data === 1) {
        window.location.href = "/";
        alert("비밀번호가 성공적으로 변경되었습니다.");
      }
    } else {
      return alert("잘못입력된 정보가 있습니다.");
    }
  };

  const editHis = async (e) => {
    e.preventDefault();
    let obj = {
      user_id: id,
      user_his: quillValue
    };
    try {
      const res = await axios.post(`${baseUrl}/CodeBridge/member/hisedit`, obj);
      console.log('약력 수정 결과', res.data);
    } catch (error) {

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
        `${baseUrl}/CodeBridge/member/iddelete`,
        mem
      );
      if (response.data === 1) {
        sessionStorage.removeItem("memberId");
        window.location.href = "/";
        alert("성공적으로 삭제되었습니다.");
      }
    } else {
      return;
    }
  };

  // 수정버튼 클릭시 div박스 display : flex 변경함수
  const [onButton, setOnButton] = useState("");
  // const onId = () => {
  //   setOnButton("userId");
  // };
  const onNick = () => {
    setOnButton("userNick");
  };
  const onPw = () => {
    setOnButton("userPw");
  };
  const onNum = () => {
    setOnButton("userNum");
  };

  const [activeHis, setActiveHis] = useState(false);

  const onHis = () => {
    setActiveHis(!activeHis);
  };

  /* 이미지 크롭 스크립트 */
  const [inputPicDisplay, setInputPicDisplay] = useState(true);

  /* 크로퍼 */
  const inputRef = useRef(null);
  const cropperRef = useRef(null);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);



  /* 크로퍼 */
  const handleCropperClick = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; // input 요소 초기화
      inputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    const files = e.target.files;
    if (!files) return;
    handleShow();
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setInputPicDisplay(false);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedDataUrl = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL();
      setCroppedImage(croppedDataUrl);
      setImage(null);
      handleSaveCroppedImage(croppedDataUrl);
    }
    setShow(false);
  };

  const [savedUrl, setSavedUrl] = useState("");

  const uploadImageToFirebase = async (croppedImageDataUrl) => {
    const imageDataBlob = await fetch(croppedImageDataUrl).then((res) => res.blob());

    try {
      const storageRef = ref(storage, `image/${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, imageDataBlob);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Firebase에 이미지를 업로드하는 동안 오류가 발생했습니다.", error);
      return null;
    }
  };

  const handleSaveCroppedImage = async (croppedImageDataUrl) => {
    const imageUrl = await uploadImageToFirebase(croppedImageDataUrl);
    console.log('유알엘 확인', imageUrl);
    setSavedUrl(imageUrl);
  };

  const changePic = async (e) => {
    console.log('제출함수 진입');
    console.log('url확인!!', savedUrl);
    let obj = {
      user_id: sessionStorage.getItem("memberId"),
      user_pic: savedUrl
    };
    const response = await axios.post(
      `${baseUrl}/CodeBridge/member/changepic`,
      obj
    );
    console.log('응답 확인', response.data);
  };

  useEffect(() => {
    if (savedUrl) {
      changePic();
    }
  }, [savedUrl]);



  /* 크로퍼 */

  useEffect(() => {
    if (croppedImage !== null) {
      const fakeUpload = document.querySelector(`.${style.fake_upload}`);
      setInputPicDisplay(true);
      fakeUpload.style.display = "none";
    }
  }, [croppedImage]);

  /* 모달 */
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setImage(null);
    setInputPicDisplay(true);
  };
  const handleShow = () => {
    /* setCroppedImage(null); */
    setShow(true);
    /* handleCropperClick(); */
  };

  /* 모달 */


  return (
    <div className={style.wrap_container}>
      <div className={style.left_container}>
        <div className={style.profile_box_after}>
          <div className="cropper_content">
            <input
              type="file"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          {/* 크로퍼 */}

          {/* 모달 */}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>이미지 사이즈 조절</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {image && (
                <div className="container">
                  <Cropper
                    ref={cropperRef}
                    aspectRatio={1} // 크롭 영역을 정사각형으로 제한
                    src={image}
                    viewMode={1}
                    width={800}
                    height={500}
                    background={false}
                    responsive
                    autoCropArea={1}
                    checkOrientation={false}
                    guides
                  />
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                취소
              </Button>
              <Button variant="primary" onClick={getCropData}>
                이미지 저장
              </Button>
            </Modal.Footer>
          </Modal>

          {/* 모달 */}

          {/* 프사 부분 */}
          <div
            className={style.input_pic}
            style={{ display: inputPicDisplay ? "block" : "none" }}
          >
            <div className={style.fake_upload}>
              <Image
                src={infoList.user_pic}
                alt="프로필 미리보기"
                roundedCircle
              />
            </div>
            <div
              className={style.img_uploads_btn}
              onClick={handleCropperClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="white"
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
            <div className={style.preview_img}>
              {croppedImage && (
                <Image
                  src={croppedImage}
                  alt="프로필 미리보기"
                  roundedCircle
                />
              )}
            </div>
          </div>
          {/* 프사 부분 */}



          <p>
            {infoList.user_name}
            {/* <span>선동욱</span> */}
          </p>
          <span>me335097@gmail.com</span>
          <span>데이터디자인 엔지니어 양성과정</span>
        </div>
      </div>
      <div className={style.right_container}>
        {/* <Profile showEditButton={true} /> */}

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
                        <p>{infoList.user_name}</p>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>닉네임</td>
                  <td>
                    <div className={style.setTable_userPw}>
                      <div className={style.setTable_userPw_originId}>
                        <p>{infoList.user_nick}</p>
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
                        <p>{infoList.user_phone}</p>
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

                {infoList.user_type == 1 &&
                  <tr>
                    <td>약력</td>
                    <td className={style.setTable_wrap}>
                      <div className={style.setTable_userhis}>
                        <div className={style.setTable_userNum_his}>
                          <span
                            dangerouslySetInnerHTML={{ __html: infoList.user_his }}
                          ></span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"
                            onClick={onHis}>
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                          </svg>
                        </div>
                      </div>
                      <div className={style.setTable_userhis}>
                        {activeHis == false ?
                          <>
                          </>
                          :
                          <div className={style.setTable_userNum_editId}>
                            <div class="input-group mb-3">
                              <QuillCompo_test />
                            </div>
                            <div>
                              <button
                                className={style.accept_button}
                                type="button"
                                onClick={editHis}
                              >
                                수정 완료
                              </button>
                            </div>
                          </div>
                        }
                      </div>
                    </td>
                  </tr>
                }
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetInfo;
