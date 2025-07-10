import React, { memo } from "react";
import { Link } from "react-router-dom";

const WeekRank = ({ data }) => {
  return (
    <div className="w-full h-full flex gap-7 ">
      {data?.map((item) => (
        <Link
          to={item.link.split(".")[0]}
          key={item.link}
          className="flex justify-between items-center h-full w-full overflow-hidden rounded-lg"
        >
          <img
            className="w-full h-full object-cover rounded-lg hover:scale-110 transition-transform duration-500 cursor-pointer"
            src={item.cover}
            alt=""
          />
        </Link>
      ))}
    </div>
  );
};

export default memo(WeekRank);
