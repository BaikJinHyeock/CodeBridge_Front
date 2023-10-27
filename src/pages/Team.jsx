import React, { useRef } from "react";
import style from "../SCSS/pages/_team.module.scss";
import Lottie from "lottie-react";

import Animation from "../components/Animation";

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
                  교육과 학습하는데 최적화되도록 제작하였습니다.
                  <br />
                  AI를 활용한 문제제출 및 채점기능으로 편리함을 느껴보세요.
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
                  CodeBridge는 여러분들의 발전을 위해 최선을 다하겠습니다.
                  <br />
                  더 나은 온라인 코딩 교육 서비스를 제공하고 여러분들을 위해 최선을 다하겠습니다.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={style.main_container_intro}>
          <div className={style.main_container_intro_box}>
            <div className={style.main_container_intro_box_text}>
              <span>What you need</span>
              <h1>Code Bridge를 사용해야하는 이유</h1>
              <div className={style.main_container_intro_box_text_div}>
                <div>
                  {/* 온라인 코딩 교육을 위한 페어 코딩 솔루션 */}
                  <h3>온라인 코딩 교육을 위한 페어 코딩 솔루션</h3>
                  <p>1. 교육자와 학생간의 원할한 소통을 위한 페어코딩</p>
                  <p>2. 교육자의 화면을 공유하며 실시간 수업진행</p>
                </div>
                <div>
                  {/* 코딩 레벨 테스트 솔루션 구현 */}
                  <h3>코딩 레벨 테스트 솔루션 구현</h3>
                  <p>1. AI를 활용하여 문제생성</p>
                  <p>2. 교육자가 채점 할 필요없는 테스트 채점 자동화</p>
                  <p>3. 과목별, 난이도별 테스트를 통해 다양한 문제 제공</p>
                </div>
              </div>
            </div>
            <Animation />
          </div>

          <div className={style.main_container_member}>
            <span>Who are we</span>
            <h1>팀원 소개</h1>

            <div className={style.main_container_member_grid}>
              <div className={style.main_container_member_grid_box}>
                <div className={style.main_container_member_grid_box_img}>
                  <img
                    src="https://i.ibb.co/JBmJ1QH/Kakao-Talk-20231024-164322710-01.png"
                    alt="img1"
                  />
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>최수환</td>
                    </tr>
                    <tr>
                      <td>Number</td>
                      <td>010-8960-7576</td>
                    </tr>
                    <tr>
                      <td>E-Mail</td>
                      <td>frcp9408@gmail.com</td>
                    </tr>
                    <tr>
                      <td>Position</td>
                      <td>PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={style.main_container_member_grid_box}>
                <div className={style.main_container_member_grid_box_img}>
                  <img
                    src="https://i.ibb.co/n6p3bQ9/Kakao-Talk-20231024-164322710-02.png"
                    alt="img2"
                  />
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>박송이</td>
                    </tr>
                    <tr>
                      <td>Number</td>
                      <td>010-2718-0489</td>
                    </tr>
                    <tr>
                      <td>E-Mail</td>
                      <td>psl5656@naver.com</td>
                    </tr>
                    <tr>
                      <td>Position</td>
                      <td>Data(AI모델)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={style.main_container_member_grid_box}>
                <div className={style.main_container_member_grid_box_img}>
                  <img
                    src="https://i.ibb.co/xf47cQF/Kakao-Talk-20231024-164322710.png"
                    alt="img3"
                  />
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>선동욱</td>
                    </tr>
                    <tr>
                      <td>Number</td>
                      <td>010-9463-6663</td>
                    </tr>
                    <tr>
                      <td>E-Mail</td>
                      <td>donguk717@gmail.com</td>
                    </tr>
                    <tr>
                      <td>Position</td>
                      <td>Back-end</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={style.main_container_member_grid_box}>
                <div className={style.main_container_member_grid_box_img}>
                  <img
                    src="https://i.ibb.co/chtw3yC/Kakao-Talk-20231024-201041810.png"
                    alt="img4"
                  />
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>백진혁</td>
                    </tr>
                    <tr>
                      <td>Number</td>
                      <td>010-6451-3350</td>
                    </tr>
                    <tr>
                      <td>E-Mail</td>
                      <td>me335097@gmail.com</td>
                    </tr>
                    <tr>
                      <td>Position</td>
                      <td>Front-end</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className={style.main_container_end}>
          <h1>Code Bridge</h1>
          <span>Coding training for both instructors and students</span>
        </div>

      </div>
    </div>
  );
};

export default Team;
