import React, { memo, useEffect, useState } from "react";
import icons from "../utils/icons";
import { SongItem } from "./";

const { MdNavigateNext } = icons;

const NewRelease = ({ data }) => {
  const [isActive, setIsActive] = useState(0);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (isActive === 0) {
      setSongs(data?.items?.all);
    } else if (isActive === 1) {
      setSongs(data?.items?.vPop);
    } else {
      setSongs(data?.items?.others);
    }
  }, [isActive, data]);

  return (
    <div className="flex flex-col gap-4 mt-[48px] w-full">
      <h3 className="font-bold text-[20px]">{data.title}</h3>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center justify-center cursor-pointer">
          <button
            onClick={() => setIsActive(0)}
            className={`uppercase px-6 py-1 font-normal text-black border border-gray-300 rounded-full text-[12px] ${
              isActive === 0 && "bg-primary text-white"
            }`}
          >
            tất cả
          </button>
          <button
            onClick={() => setIsActive(1)}
            className={`uppercase px-6 py-1 font-normal text-black border border-gray-300 rounded-full text-[12px] ${
              isActive === 1 && "bg-primary text-white"
            }`}
          >
            việt nam
          </button>
          <button
            onClick={() => setIsActive(2)}
            className={`uppercase px-6 py-1 font-normal text-black border border-gray-300 rounded-full text-[12px] ${
              isActive === 2 && "bg-primary text-white"
            }`}
          >
            quốc tế
          </button>
        </div>
        <div className="hover:text-primary flex items-center gap-1 cursor-pointer">
          <span className="uppercase text-[12px]">tất cả</span>
          <span>
            <MdNavigateNext size={20} />
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-7 gap-y-5">
        {songs
          ?.filter((_, index) => index <= 11)
          .map((item) => (
            <SongItem
              key={item.encodeId}
              sid={item.encodeId}
              thumbnail={item.thumbnailM}
              title={item.title}
              artist={item.artistsNames}
              releaseDate={item.releaseDate}
            />
          ))}
      </div>
    </div>
  );
};

export default memo(NewRelease);
