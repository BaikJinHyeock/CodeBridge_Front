import React from "react";

import style from "../SCSS/pages/_footer.module.scss";

const Footer = () => {
  return (
    <div className={style.wrap_container}>
      <div className={style.wrap_container_main}>
        <h5>SPONSORED BY</h5>
        <div className={style.wrap_container_main_logo}>
          <div className={style.wrap_container_main_logo_itty}>
            <img src="https://firebasestorage.googleapis.com/v0/b/codebridge-969ab.appspot.com/o/image%2Fitty.png?alt=media&token=d2cc99ec-aede-4d9f-ad2b-ce343c2cb635&_gl=1*1q9bmws*_ga*MTU2ODg3Nzc4Mi4xNjk0MDY2NDIz*_ga_CW55HF8NVT*MTY5OTA2OTAwNS4xNi4xLjE2OTkwNjkxODguOC4wLjA." alt="itty" />
          </div>
          <div className={style.wrap_container_main_logo_smart}>
            <img src="https://firebasestorage.googleapis.com/v0/b/codebridge-969ab.appspot.com/o/image%2Fsmart.png?alt=media&token=0b8e9c81-2f3f-4fb4-ae01-896431db82f3&_gl=1*bbpeb4*_ga*MTU2ODg3Nzc4Mi4xNjk0MDY2NDIz*_ga_CW55HF8NVT*MTY5OTA2OTAwNS4xNi4xLjE2OTkwNjkyMTYuNjAuMC4w" alt="itty" />
          </div>
        </div>

        <div className={style.wrap_container_main_adr}>
          <p>
            주소 : 광주 동구 예술길 31-15 3~4, 7층
            <br />
            제작자 : 최수환, 박송이, 선동욱, 백진혁
          </p>
        </div>
      </div>
        <h3>Copyright&copy;2023 CodeBridge All rights reserved.</h3>
    </div>
  );
};

export default Footer;
