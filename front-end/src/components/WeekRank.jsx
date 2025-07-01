import React, { memo } from "react";
import { Link } from "react-router-dom";

const WeekRank = ({ data }) => {
  return (
    <div className="w-full h-[100px] flex gap-7 mt-[48px]">
      {data?.map((item) => (
        <Link
          to={item.link.split(".")[0]}
          key={item.link}
          className="w-[30%] h-full border border-red-500 overflow-hidden rounded-lg"
        >
          <img
            className="object-contain rounded-lg hover:scale-110 transition-transform duration-500 cursor-pointer"
            src={item.cover}
            alt=""
          />
        </Link>
      ))}
    </div>
  );
};

export default memo(WeekRank);
