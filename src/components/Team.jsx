import React, { useRef } from "react";
import style from "../SCSS/pages/_team.module.scss";

const Team = () => {
  const videoRef = useRef();
  const setPlayBackRate = () => {
    videoRef.current.playbackRate = 0.3;
  };

  return (
    <div className={style.wrap_container}>
      <div className={style.main_banner}>
        <video
          className={style.banner_video}
          ref={videoRef}
          src="./img/teamBanner.mp4"
          autoPlay
          loop
          muted
          playsInline
          play
          onCanPlay={() => setPlayBackRate()}
        ></video>
        <div className={style.banner_text}>
          <h1>Who we are?</h1>
          <h5>Code Bridge</h5>
        </div>
      </div>

      <div className={style.main_container}>
        <div className={style.main_content}>
          <div className={style.main_grid}>
            <div className={style.main_grid_img}>
              <div className={style.main_grid_img_first}>
                <span>Online education</span>
                <h1>
                  코딩 학습자들을 위한 <br />
                  온라인 교육 플랫폼
                </h1>
              </div>
              <img
                src="https://i.ibb.co/1s6BdnY/Amigos-Lightbulb-1.png"
                alt="!"
              />
            </div>

            <div className={style.main_grid_text}>
              <div>
                <h1>Learning</h1>
                <h4>배움, 학습, 습득</h4>
                <span>
                  코딩교육을 찾고있는 여러분들을 위해 필요한 것들로만
                  구성했습니다.
                  <br />
                  가장 가까운곳에서 도움을 드리겠습니다.
                </span>
              </div>
              <div>
                <h1>Mate</h1>
                <h4>동료, 친구</h4>
                <span>
                  코딩교육을 찾고있는 여러분들을 위해 필요한 것들로만
                  구성했습니다.
                  <br />
                  가장 가까운곳에서 도움을 드리겠습니다.
                </span>
              </div>
              <div>
                <h1>Synerge</h1>
                <h4>협력 작용, 협동</h4>
                <span>
                  코딩교육을 찾고있는 여러분들을 위해 필요한 것들로만
                  구성했습니다.
                  <br />
                  가장 가까운곳에서 도움을 드리겠습니다.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
