import React, { memo } from "react";

const Button = ({ text }) => {
  return (
    <div>
      <button className="uppercase px-6 py-1 font-normal text-black border border-gray-300 rounded-full text-[12px]">
        {text}
      </button>
    </div>
  );
};

export default memo(Button);
