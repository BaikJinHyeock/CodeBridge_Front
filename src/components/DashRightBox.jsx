import React from "react";
import style from "../SCSS/pages/_dashRightBox.module.scss";

const DashRightBox = () => {
 

  return (
    <div className={style.right_wrap_container}>
      <div className={style.content_box1}>
        <h4>담당 강사님</h4>

        <div className={style.profile_box}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxie9jrtylbVz5UsvAAKz2zZsaG4DC0BlK0A&usqp=CAU"
            alt="#"
          />
        </div>
        <p>박수현 선임</p>
        <span>교육기간 2023.04.27 ~ 11.27</span>
      </div>

      <div className={style.content_box2}>
        <h4>출결사항</h4>
        <div className={style.info_box_attend}>
          <div>
            <span>출석</span>
            <p>19</p>
          </div>
          <div>
            <span>결석</span>
            <p>1</p>
          </div>
          <div>
            <span>지각</span>
            <p>3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashRightBox;
