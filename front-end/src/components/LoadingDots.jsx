import React from "react";
import { MutatingDots } from "react-loader-spinner";

const LoadingDots = () => {
  return (
    <MutatingDots
      visible={true}
      height="100"
      width="100"
      color="#8A21BE"
      secondaryColor="#8A21BE"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default LoadingDots;
