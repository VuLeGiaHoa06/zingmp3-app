import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <RotatingLines
      visible={true}
      height="24"
      width="24"
      color="blue"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default LoadingSpinner;
