import axios from "axios";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Cropper from "react-cropper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { storage } from "../Firebase";
import style from "../SCSS/pages/_classWrite.module.scss";
import QuillCompo from "../components/QuillCompo";
import Image from "react-bootstrap/Image";


const ClassWrite = () => {

  // 스프링 주소
  const baseUrl = process.env.REACT_APP_BASE_URL;


  const quillValue = useSelector((state) => state.quill.quillValue);


  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [content, setContent] = useState("");
  const [findLang, setFindLang] = useState();
  const [findLangList, setFindLangList] = useState([]);
  const [additionalInputs, setAdditionalInputs] = useState([
    { week: "", content: "" },
  ]);
  const [subNumList, setSubNumList] = useState([]);

  console.log('주차 값 확인', additionalInputs);
  console.log('과목넘버들 확인', subNumList);

  const handleAddInput = () => {
    setAdditionalInputs([...additionalInputs, { week: "", content: "" }]);
  };

  const handleInputChange = (index, event) => {
    const updatedInputs = [...additionalInputs];
    updatedInputs[index][event.target.name] = event.target.value;
    setAdditionalInputs(updatedInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // state 값들을 확인하고, 비어있는 값이 있는지 확인합니다.
    if (!title || !target || !startDate || !endDate || !quillValue) {
      alert('값이 모두 입력되지 않았습니다. 모든 필수 항목을 입력해주세요.');
      return;
    }

    // 주차와 내용을 ":"로 구분하고, 각 쌍을 ","로 구분하여 문자열로 만듦
    const curriculumString = additionalInputs
      .map((input) => `${input.week}::${input.content}`)
      .join(",, ");

    try {
      let obj = {
        user_id: sessionStorage.getItem("memberId"),
        class_title: title,
        class_content: quillValue,
        class_target: target,
        curriculum: curriculumString,
        class_startdate: startDate,
        class_enddate: endDate,
        sub_num: subNumList.join(','),
        // curriculum에 문자열을 할당
      };
      const response = await axios.post(`${baseUrl}/CodeBridge/class/write`, obj);
      console.log('응답 확인', response.data);
      if (response.data == 'success') {
        alert('작성 완료')
      } else {
        alert('작성 실패')
      }
    } catch (error) {
      console.error('통신 오류', error);

    }


  };

  const subListByName = async (e) => {
    e.preventDefault();

    let obj = {
      sub_lang: findLang,
    };

    const response = await axios.post(
      "http://localhost:8085/CodeBridge/sub/findbyname",
      obj
    );

    setFindLangList(response.data);


  };

  // 모달 관련
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [selectedWeekIndex, setSelectedWeekIndex] = useState(null);
  const handleShow = (index) => {
    setSelectedWeekIndex(index);
    setShow(true);
  }
  // 모달 관련



  // 과목 전부 긁어오는 코드
  const [subList, setSubList] = useState([]);

  const getSubList = async (e) => {
    await axios.get(`http://localhost:8085/CodeBridge/sub/find`)
      .then(response => {
        console.log('과목 리스트 확인', response.data);
        setSubList(response.data);
      })
      .catch(error => {
        console.error();
      })
      ;
  };

  useEffect(() => {
    getSubList();
  }, []);

  const SubItem = ({ props, handleSubItemClick }) => {
    const handleItemClick = () => {
      handleSubItemClick(props); // 클릭 시 부모 컴포넌트의 함수 호출
    }
    return (
      <div className={style.sub_item_box} onClick={handleItemClick}>
        <span>과목 번호 : {props.sub_num}</span>
        <span>언어 : {props.sub_lang}</span>
        <span>강사 : {props.user_name}</span>
        <span>강의 명 : {props.sub_title}</span>
      </div>
    );
  }


  // ...
  const handleSubItemClick = (item, index) => {
    const updatedInputs = [...additionalInputs];
    updatedInputs[index].content = `과목 번호: ${item.sub_num}, 언어: ${item.sub_lang}, 강사: ${item.user_name}, 강의 명: ${item.sub_title} `;
    setAdditionalInputs(updatedInputs);
    // 이전의 subNumList를 가져와서 새로운 값을 추가
    setSubNumList(prevSubNumList => [...prevSubNumList, item.sub_num]);
    setFindLang();
    setFindLangList([]);
    handleClose(); // 모달 닫기
  }

  // 주차 삭제 메서드
  const handleRemoveInput = (index) => {
    const updatedInputs = [...additionalInputs];
    const removedItem = updatedInputs.splice(index, 1)[0]; // 삭제된 항목을 가져옴
    console.log('리무브아이템 확인', removedItem);
    setAdditionalInputs(updatedInputs);

    // 정규표현식을 사용하여 content에서 sub_num을 추출
    const subNumToRemove = removedItem.content.match(/과목 번호: (\d+)/);

    // sub_num이 존재할 경우 subNumList에서 제거
    if (subNumToRemove) {
      const subNum = parseInt(subNumToRemove[1]);
      setSubNumList(prevSubNumList => prevSubNumList.filter(subNumItem => subNumItem !== subNum));
    }
  };

  // 크로퍼 부분 시작

  const imgPathRef = useRef(null)
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
      inputRef.current.value = ''; // input 요소 초기화
      inputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files) return;
    handleCropperShow();
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setInputPicDisplay(false);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedDataUrl = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
      setCroppedImage(croppedDataUrl);
      setImage(null);
      handleSaveCroppedImage(croppedDataUrl);
    }
    setShowCropper(false);
  };

  const handleCancelCrop = () => {
    setImage(null);
    setInputPicDisplay(true); // 이미지 입력을 취소하면 display를 다시 block으로 변경
  };

  /* 크로퍼 */

  useEffect(() => {
    if (croppedImage !== null) {
      const fakeUpload = document.querySelector(`.${style.fake_upload}`);
      setInputPicDisplay(true);
      fakeUpload.style.display = 'none';
    }
  }, [croppedImage]);

  // base64 -> formdata
  const handlingDataForm = async (dataURI) => {
    if (dataURI !== null && dataURI.length > 200) {
      // dataURL 값이 data:image/jpeg:base64,~~~~~~~ 이므로 ','를 기점으로 잘라서 ~~~~~인 부분만 다시 인코딩
      const byteString = atob(dataURI.split(",")[1]);
      // const nickname = sessionStorage.getItem("memberNickname");
      // Blob를 구성하기 위한 준비, 잘은 모르겠음.. 코드존나어려워
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ia], {
        type: "image/jpeg",
      });
      const file = new File([blob], "image.jpg");
      // 위 과정을 통해 만든 image폼을 FormData에
      // 서버에서는 이미지를 받을 때, FormData가 아니면 받지 않도록 세팅해야함
      const formData = new FormData();
      formData.append("img", file);
      // formData.append("writer",nickname)
      try {
        const result = await axios.post(
          `${baseUrl}/save/save`,
          formData
        );
        const url = result.data.url;
        return url;
      } catch (error) {
        console.log(error);
      }
    } else {
      return dataURI;
    }

  };

  /* 모달 */
  const [showCropper, setShowCropper] = useState(false);

  const handleCropperClose = () => {
    setShowCropper(false);
    setImage(null);
    setInputPicDisplay(true);
  }
  const handleCropperShow = () => {
    /* setCroppedImage(null); */
    setShowCropper(true);
    /* handleCropperClick(); */
  }

  /* 모달 */

  /* 파이어베이스 시작 */
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

  /* 파이어베이스 끝 */

  // 크로퍼 부분 끝





  return (
    <div className={style.wrap_container}>
      <ul>
        <Link to={"/ClassWrite"}>
          <li>
            강의실 생성
            <span></span>
          </li>
        </Link>
        <Link to={"/SubWrite"}>
          <li>
            과목 생성
          </li>
        </Link>
      </ul>

      <div className={style.first_container}>
        <div className={style.left_container}>
          <span>Application for Class Opening</span>
          <h1>
            강사님의 교육과정에 대해
            <br />
            소개해주세요
          </h1>
        </div>

        <div className={style.right_container}>
          <form>
            <div className={style.input_box}>
              <span className={style.span_tag}>교육 명</span>
              <input
                type="text"
                value={title}
                placeholder="Title"
                class="form-control"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>

            {/* 대표이미지 부분 */}
            <div className={style.upload_img_block}>
              <h4>포트폴리오 대표 이미지</h4>
              <div ref={imgPathRef}></div>
              {croppedImage &&
                <div onClick={handleCropperClick}>이미지 재등록</div>
              }
            </div>
            <div className={style.market_pic}>
              <div className={style.input_pic}>
                <div
                  className={style.fake_upload}
                  onClick={handleCropperClick}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                  </svg>
                  <span>이미지 등록</span>
                </div>
                {/* 크로퍼 */}

                <div className='cropper_content'>
                  <form>
                    <input
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </form>
                </div>
                {/* 크로퍼 */}

                {/* 모달 */}

                <Modal show={showCropper} onHide={handleCropperClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>이미지 사이즈 조절</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {image && (
                      <div className="container">
                        <Cropper
                          ref={cropperRef}
                          aspectRatio={1.86} // 크롭 영역을 정사각형으로 제한
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
                    <Button variant="secondary" onClick={handleCropperClose}>
                      취소
                    </Button>
                    <Button variant="primary" onClick={getCropData}>
                      이미지 저장
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* 모달 */}
                <div className={style.preview_img}>
                  {croppedImage && (
                    <img src={croppedImage} alt="" />
                  )}
                </div>

              </div>
            </div>
            {/* 대표이미지 부분 */}

            <div className={style.input_box}>
              <span className={style.span_tag}>교육 대상</span>
              <input
                type="text"
                value={target}
                placeholder="Education target audience"
                class="form-control"
                onChange={(e) => setTarget(e.target.value)}
              ></input>
            </div>

            <div className={style.input_box}>
              <span className={style.span_tag}>교육 기간</span>
              <div className={style.input_date}>
                <input
                  type="date"
                  value={startDate}
                  class="form-control"
                  onChange={(e) => setStartDate(e.target.value)}
                ></input>

                <input
                  type="date"
                  value={endDate}
                  class="form-control"
                  onChange={(e) => setEndDate(e.target.value)}
                ></input>
              </div>
            </div>

            <div className={style.input_box}>
              <span className={style.span_tag}>교육 설명</span>
              <QuillCompo />
            </div>

            <div className={style.input_box}>
              <span className={style.span_tag}>
                커리큘럼
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-plus-circle-fill"
                  viewBox="0 0 16 16"
                  onClick={handleAddInput}
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
              </span>

              {additionalInputs.map((input, index) => (
                <div key={index} className={style.input_cur}>
                  <input
                    type="text"
                    name="week"
                    value={input.week}
                    placeholder="주차"
                    class="form-control"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  {input.content ? (
                    <div className={style.selectedSubItem} onClick={() => handleShow(index)}>
                      <span>{input.content}</span>
                    </div>
                  ) : (
                    <div onClick={() => handleShow(index)}>
                      과목 선택
                    </div>
                  )}
                  {index === additionalInputs.length - 1 && (
                    <button onClick={() => handleRemoveInput(index)}>삭제</button>
                  )}
                </div>
              ))}
              <Modal
                show={show}
                onHide={handleClose}
                style={{ top: '20%' }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>과목 목록</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <style>
                    {`.modal - content { width: 600px; } `}
                  </style>

                  <div>
                    <form onSubmit={subListByName}>
                      <input
                        type="text"
                        value={findLang}
                        placeholder="과목 검색"
                        class="form-control"
                        onChange={(e) => setFindLang(e.target.value)} />
                    </form>
                  </div>


                  {findLangList.length > 0 ?
                    findLangList.map((item, index) => (
                      <SubItem key={index} props={item} handleSubItemClick={() => handleSubItemClick(item, selectedWeekIndex)} />
                    ))
                    :
                    subList.map((item, index) => (
                      <SubItem key={index} props={item} handleSubItemClick={() => handleSubItemClick(item, selectedWeekIndex)} />
                    ))
                  }



                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* <List /> */}
            </div>
          </form>
          <button
            type="submit"
            className={style.submit_button}
            onClick={handleSubmit}
          >
            교육 개설
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassWrite;
