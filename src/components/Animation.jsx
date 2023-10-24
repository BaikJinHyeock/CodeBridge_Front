import React from 'react'

import Lottie from "lottie-react";
import loadingLottie from "../assets/lottie/team_animation.json";

const Animation = () => {
  return (
        <Lottie animationData={loadingLottie} />
  )
}

export default Animation