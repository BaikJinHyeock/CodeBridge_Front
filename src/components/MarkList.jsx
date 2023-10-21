import React from "react";
import Profile from "./Profile";
import style from "../SCSS/pages/_markList.module.scss";
import { Link, useNavigate } from "react-router-dom";

const MarkList = () => {
  const navigate = useNavigate();
  const SetTestList = () => {
    // const [moveButton, setMoveButton] = useState("");

    const moveButton = () => {
      navigate("/MarkDetail");
    };

    return (
      <div className={style.item}>
        <div>
          <span>1주차</span>
          <h5>O.T및 Java</h5>
        </div>
        <button className={style.before_button} onClick={moveButton}>
          채점하기
        </button>
      </div>
    );
  };

  return (
    <div className={style.wrap_container}>
      <div className={style.right_container}>
        <Profile />
        <div className={style.right_container_grid_box}>
          <h4>과목별 채점하기</h4>

          <div className={style.right_container_grid_box_detail}>
            <SetTestList />
            <SetTestList />
            <SetTestList />
            <SetTestList />
            <SetTestList />
            <SetTestList />
            <SetTestList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkList;
