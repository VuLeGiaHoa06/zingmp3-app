import React, { useState, useEffect } from "react";
import icons from "../utils/icons";
import { useSelector } from "react-redux";
import { SongItem } from ".";
import { Link } from "react-router-dom";
import * as apis from "../apis";
import Scrollbars from "react-custom-scrollbars-2";

const { BiTrash } = icons;

const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false);
  const [playList, setPlayList] = useState();

  const { curSongData, curAlbumId, curSongId, recentSongs, isPlaying } =
    useSelector((state) => state.music);

  useEffect(() => {
    isPlaying && setIsRecent(false);
  }, [isPlaying]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apis.apiGetDetailPlaylist(curAlbumId);
      if (res?.data.err === 0) {
        setPlayList(res.data.data);
      }
    };
    fetchData();
  }, [curSongId]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="h-[70px] w-full flex-none flex justify-between items-center px-2 py-[14px]">
        <div className="flex text-xs bg-[#F2F2F2] p-[3px] flex-2 w-[70%] justify-center rounded-l-full rounded-r-full cursor-pointer font-semibold hover:text-primary text-gray-600">
          <span
            onClick={() => setIsRecent((prev) => !prev)}
            className={`py-[5px] ${
              !isRecent && "bg-white text-primary"
            } flex-1 flex justify-center rounded-l-full rounded-r-full `}
          >
            Danh sách phát
          </span>
          <span
            onClick={() => setIsRecent((prev) => !prev)}
            className={`py-[5px] ${
              isRecent && "bg-white text-primary"
            } flex-1 flex justify-center rounded-l-full rounded-r-full `}
          >
            Nghe gần đây
          </span>
        </div>
        <span className="p-2 bg-gray-200 rounded-full cursor-pointer">
          <BiTrash size={16} />
        </span>
      </div>
      {isRecent ? (
        <div className="px-2 py-2 flex flex-col h-full">
          <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
            <div className="flex flex-col">
              {recentSongs &&
                recentSongs?.map((item) => (
                  <SongItem
                    key={item?.sid}
                    sid={item?.sid}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artist={item?.artists}
                    sizeImg={"w-[40px] h-[40px]"}
                    style={"hover:bg-gray-100"}
                  />
                ))}
            </div>
            <div className="w-full h-[90px]"></div>
          </Scrollbars>
        </div>
      ) : (
        <div className="px-2 py-2 flex flex-col h-full">
          <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
            <SongItem
              sid={curSongData?.encodeId}
              thumbnail={curSongData?.thumbnailM}
              title={curSongData?.title}
              artist={curSongData?.artistsNames}
              sizeImg={"w-[40px] h-[40px]"}
              isActive
            />
            <div className="pt-[15px] px-2 pb-[5px]">
              <span className="font-bold">Tiếp theo</span>
              <div className="flex gap-2 items-center text-[16px]">
                <span className="text-gray-600">Từ playlist</span>
                <Link
                  to={playList?.link.split(".")[0]}
                  className="text-primary font-bold"
                >{`${
                  playList?.title.length > 20
                    ? `${playList?.title.slice(0, 20)}...`
                    : playList?.title
                }`}</Link>
              </div>
            </div>
            <div className="flex flex-col">
              {playList &&
                playList?.song.items?.map((item) => (
                  <SongItem
                    key={item?.encodeId}
                    sid={item?.encodeId}
                    thumbnail={item?.thumbnailM}
                    title={item?.title}
                    artist={item?.artistsNames}
                    sizeImg={"w-[40px] h-[40px]"}
                    style={"hover:bg-gray-100"}
                  />
                ))}
            </div>
          </Scrollbars>
          <div className="w-full h-[90px]"></div>
        </div>
      )}
    </div>
  );
};

export default SidebarRight;
