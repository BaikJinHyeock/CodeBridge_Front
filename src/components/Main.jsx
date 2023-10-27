import React from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import style from "../SCSS/pages/_main.module.scss";
import { Container } from "./styled";
import { useScrollAnimation } from "./useScrollAnimation";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const moveJoin = () => {
    navigate("/Join");
  }
  const moveTeam = () => {
    navigate("/Team");
  }

  // 스크롤 이벤트
  const Scroll = ({ children }) => {
    const { ref, isInViewport } = useScrollAnimation();
    return (
      <Container ref={ref} className={isInViewport ? "frame-in" : ""}>
        {children}
      </Container>
    );
  };

  const ClassContent = () => {
    return (
      <div className={style.main_slide_content_box}>
        <img
          src="https://smhrd.or.kr/wp-content/uploads/2023/08/%EB%8C%80%EC%A7%80-1-%EC%82%AC%EB%B3%B8.png"
          alt="#"
        />
        <h5>[A-1코스] 빅데이터 분석서비스 개발자과정</h5>
        <span>개강일 | 2023년 4월 27일</span>
        <p>박수현 선임</p>
      </div>
    );
  };

  return (
    <div className={style.wrap_container}>
      <div className={style.main_banner}>
        <video
          className={style.banner_video}
          src="./img/mainBanner.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <div className={style.banner_text}>
          <h1>Code Bridge</h1>
          <h5>Learning Management System</h5>
          <p>
            TEAM <span>LMS</span>
          </p>
        </div>
      </div>

      <div className={style.main_container}>
        <div className={style.main_slide}>
          <h2>강의실 둘러보기</h2>
          <Swiper
            slidesPerView={3.5}
            spaceBetween={36}
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper"
            direction="horizontal"
          >
            <SwiperSlide>
              <ClassContent />
            </SwiperSlide>
            <SwiperSlide>
              <ClassContent />
            </SwiperSlide>
            <SwiperSlide>
              <ClassContent />
            </SwiperSlide>
            <SwiperSlide>
              <ClassContent />
            </SwiperSlide>
            <SwiperSlide>
              <ClassContent />
            </SwiperSlide>
            <SwiperSlide>
              <ClassContent />
            </SwiperSlide>
          </Swiper>
        </div>

        <Scroll>
          <div className={style.main_grid}>
            <div className={style.main_grid_leftBox}>
              <h1>
                <span>LMS</span>에서 제작한
                <br /> 온라인 코딩 에듀케이션
              </h1>
              <div>
                <h2>Code Bridge</h2>
                <span onClick={moveTeam}>
                  팀소개 바로가기
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-right-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className={style.main_grid_rightBox}>
              <img
                src="https://i.ibb.co/jTCKSBy/Amigos-Home-Alone.png"
                alt="mainImage1"
              />
            </div>
          </div>
        </Scroll>

        <Scroll>
          <div className={style.main_grid}>
            <div className={style.main_grid_rightBox}>
              <img
                src="https://i.ibb.co/Rbg7kD5/Amigos-Online-Shopping.png"
                alt="#"
              />
            </div>
            <div className={style.main_grid_leftBox}>
              <h1>
                <span>스마트인재개발</span>에서 하는 강의를
                <br /> Code Bridge로 간편하게
              </h1>
              <div>
                <h2>To be together</h2>
                <span onClick={moveJoin}>
                  회원가입 바로가기
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-right-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Scroll>

        <Scroll>
          <div className={style.main_grid}>
            <div className={style.main_grid_leftBox}>
              <h1>
                팀원들과 함께하는 <span>페어코딩,</span>
                <br /> 코딩작업과 소통을 한번에!
              </h1>
              <div>
                <h2>Let's Develop</h2>
                <span>
                  내 강의실 바로가기
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-right-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className={style.main_grid_rightBox}>
              <img
                src="https://i.ibb.co/GP8WTz3/Amigos-Chatting.png"
                alt="mainImage1"
              />
            </div>
          </div>
        </Scroll>
      </div>

      
    </div>
  );
};

export default Main;
