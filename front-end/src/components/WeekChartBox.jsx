import React, { memo, useEffect, useState } from "react";
import icons from "../utils/icons";
import { List } from "./";
const { IoMdPlay } = icons;
import { Link } from "react-router-dom";

const WeekChartBox = ({ data, title }) => {
  const [songs, setSongs] = useState([]);
  console.log(data);

  useEffect(() => {
    setSongs(data?.items.filter((_, i) => i <= 4));
  }, [data]);

  return (
    <div className="flex flex-col flex-1 bg-white rounded-xl p-4 ">
      <div className="flex gap-2 items-center pl-[40px] pb-[10px]">
        <h3 className="text-[24px] font-bold text-primary">{title}</h3>
        <span className="p-2 bg-primary rounded-full flex hover:bg-[#7F1FAF] cursor-pointer text-white">
          <IoMdPlay size={16} />
        </span>
      </div>
      {songs?.map((item, index) => (
        <List
          thumbnail={item.thumbnail}
          title={item.title}
          duration={item.duration}
          sid={item.encodeId}
          artistsNames={item.artistsNames}
          order={index + 1}
        />
      ))}
      <div className="w-full flex items-center justify-center mt-[30px]">
        <Link
          to={data.link.split(".")[0]}
          className="px-4 py-2 bg-white border border-primary text-primary rounded-l-full rounded-r-full hover:bg-gray-100"
        >
          Xem tất cả
        </Link>
      </div>
    </div>
  );
};

export default memo(WeekChartBox);
