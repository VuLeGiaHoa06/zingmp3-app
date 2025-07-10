import React, { memo } from "react";
import icons from "../utils/icons";
import { handleNumber } from "../utils/helper";
const { IoPersonAdd, PiShuffle } = icons;
import { Link } from "react-router-dom";

const Artists = ({ data }) => {
  return (
    <div className={`flex gap-8 ${data?.length > 5 ? "justify-between" : ""}`}>
      {data
        ?.filter((_, index) => index < 5)
        ?.map((item) => (
          <div key={item.id} className="flex flex-col gap-3 items-center">
            <Link
              to={item.link}
              className="overflow-hidden w-[224px] h-[224px] rounded-full cursor-pointer relative group"
            >
              <img
                className="w-full h-full rounded-full object-cover group-hover:scale-110 duration-700"
                src={item.thumbnail}
                alt={item.title}
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center text-white hover:bg-overlay-30 opacity-0 hover:opacity-100">
                <span className="p-3 border border-white rounded-full hover:border-gray-200 hover:text-gray-200">
                  <PiShuffle size={24} />
                </span>
              </div>
            </Link>
            <div className="flex flex-col gap-1 items-center">
              <Link
                to={item.link}
                className="text-[14px] font-semibold hover:underline hover:text-primary"
              >
                {item.name}
              </Link>
              <span className="text-[12px] text-gray-500">
                {`${handleNumber(item.totalFollow)} quan tâm`}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-primary px-4 py-1 text-white rounded-l-full rounded-r-full w-fit hover-[#7F1FAF]">
              <span>
                <IoPersonAdd size={16} />
              </span>
              <button className="uppercase text-[12px] font-normal">
                Quan tâm
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default memo(Artists);
