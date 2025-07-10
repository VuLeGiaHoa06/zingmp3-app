import React from "react";
import { List, Section, Artists, SongItem } from "../../components";
import { useSelector } from "react-redux";

import icons from "../../utils/icons";
const { MdNavigateNext, PiShuffle } = icons;

const SearchAll = () => {
  const { searchData, curSongId } = useSelector((state) => state.music);
  // console.log(searchData?.songs.filter((_, index) => index < 2));

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between ">
          <h3 className="text-[20px] font-bold">Nổi Bật</h3>
        </div>
        <div className="flex gap-6 h-[100px] ">
          <div className="flex gap-3 flex-1 h-full items-center p-3 hover:bg-gray-200 cursor-pointer group rounded-md bg-gray-100">
            <div className="w-[84px] h-[84px] relative rounded-full overflow-hidden">
              <img
                className="w-full h-full object-contain rounded-full"
                src={searchData?.top?.thumbnail}
                alt=""
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center text-white group-hover:bg-overlay-30 opacity-0 group-hover:opacity-100">
                <span className="p-3 hover:text-gray-200">
                  <PiShuffle size={20} />
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <span className="text-[12px] text-gray-400">Nghệ sĩ</span>
              <span className="text-[14px] font-bold">
                {searchData?.top?.name}
              </span>
            </div>
          </div>
          {searchData?.songs
            .filter((_, index) => index < 2)
            .map((item) => (
              <div
                key={item.encodeId}
                className="flex gap-2 flex-1 h-full bg-gray-100 rounded-md"
              >
                <SongItem
                  sid={item.encodeId}
                  thumbnail={item.thumbnailM}
                  title={item.title}
                  artist={item.artistsNames}
                  style={"hover:bg-gray-200"}
                  sizeImg={"w-[84px] h-[84px]"}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between ">
          <h3 className="text-[20px] font-bold">Bài Hát</h3>
          <div className="hover:text-primary flex items-center gap-1 cursor-pointer">
            <span className="uppercase text-[12px]">tất cả</span>
            <span>
              <MdNavigateNext size={20} />
            </span>
          </div>
        </div>
        <div className="flex flex-wrap w-full justify-between">
          {searchData?.songs
            ?.filter((_, index) => index < 6)
            .map((item) => (
              <div
                key={item.encodeId}
                className={`${
                  item.encodeId === curSongId && "bg-gray-100 rounded-md"
                } w-[49%]`}
              >
                <List
                  thumbnail={item.thumbnail}
                  title={item.title}
                  duration={item.duration}
                  sid={item.encodeId}
                  artistsNames={item.artistsNames}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <Section data={searchData?.playlists} title={"Playlist/Album"} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between ">
          <h3 className="text-[20px] font-bold">Nghệ Sĩ/OA</h3>
          <div className="hover:text-primary flex items-center gap-1 cursor-pointer">
            <span className="uppercase text-[12px]">tất cả</span>
            <span>
              <MdNavigateNext size={20} />
            </span>
          </div>
        </div>
        <Artists data={searchData?.artists} />
      </div>
      <div className="w-full h-[90px]"></div>
    </div>
  );
};

export default SearchAll;
