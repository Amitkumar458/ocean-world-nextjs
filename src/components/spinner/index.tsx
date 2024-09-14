import React from "react";
import Lottie from "lottie-react";
import animationData from "./animation.json";

interface LottieSpinnerProps {
  width?: number;
  height?: number;
}

const LottieSpinner: React.FC<LottieSpinnerProps> = ({
  width = 400,
  height = 400,
}) => {
  return <Lottie animationData={animationData} style={{ width, height, }} />;
};

export default LottieSpinner;
