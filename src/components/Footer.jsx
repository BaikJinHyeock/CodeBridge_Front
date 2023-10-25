import React from "react";

import style from "../SCSS/pages/_footer.module.scss";

const Footer = () => {
  return (
    <div className={style.wrap_container}>
      <div className={style.wrap_container_main}>
        <h5>SPONSORED BY</h5>
        <div className={style.wrap_container_main_logo}>
          <div className={style.wrap_container_main_logo_itty}>
            <img src="./img/itty.png" alt="itty" />
          </div>
          <div className={style.wrap_container_main_logo_smart}>
            <img src="./img/smart.png" alt="itty" />
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
        <h3>Copyright&copy;2002 webzigi All rights reserved.</h3>
    </div>
  );
};

export default Footer;
