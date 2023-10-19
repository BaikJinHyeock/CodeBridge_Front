import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import style from "../SCSS/pages/_main.module.scss";

const Main = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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

      <button>
        <Link to={"/DashBoard"}>대쉬보드 이동</Link>
      </button>

      <div className={style.main_slide}>
        <h2>강의실 둘러보기</h2>
        <Slider {...settings}>
          <img
            src="https://smhrd.or.kr/wp-content/uploads/2023/08/%EB%8C%80%EC%A7%80-1-%EC%82%AC%EB%B3%B8.png"
            alt=""
          />
          <img
            src="https://smhrd.or.kr/wp-content/uploads/2023/08/%EB%8C%80%EC%A7%80-1-%EC%82%AC%EB%B3%B8-2.png"
            alt=""
          />
          <img
            src="https://smhrd.or.kr/wp-content/uploads/2023/08/%EB%8C%80%EC%A7%80-1.png"
            alt=""
          />
          <img
            src="https://i.pinimg.com/564x/75/53/60/7553605dba4e890c46da5ba4fcb931c0.jpg"
            alt=""
          />
          <img
            src="https://i.pinimg.com/564x/75/53/60/7553605dba4e890c46da5ba4fcb931c0.jpg"
            alt=""
          />
          <img
            src="https://i.pinimg.com/564x/75/53/60/7553605dba4e890c46da5ba4fcb931c0.jpg"
            alt=""
          />
        </Slider>
      </div>
    </div>
  );
};

export default Main;
