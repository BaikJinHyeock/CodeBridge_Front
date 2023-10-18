import React from "react";
import style from "../SCSS/pages/_title.module.scss";

const Title = (props) => {
  return (
    <div className={style.info_box}>
      <h2>{props.pageName}</h2>
      <div className={style.info_box_attend}>
        <div>
          <h4>출석</h4>
          <p>19</p>
        </div>
        <div>
          <h4>결석</h4>
          <p>1</p>
        </div>
        <div>
          <h4>지각</h4>
          <p>3</p>
        </div>
      </div>
    </div>
  );
};

export default Title;
