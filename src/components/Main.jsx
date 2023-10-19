import React from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import style from "../SCSS/pages/_main.module.scss";

const Main = () => {
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
            slidesPerView={4.5}
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

        <div className={style.main_grid}>
          <div>
            <h2>스마트인재개발원에서 제작한 온라인 코딩 에듀케이션</h2>

            <div>
              <p>Learning Ma</p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Main;
