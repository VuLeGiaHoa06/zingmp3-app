import moment from "moment";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import icons from "../utils/icons";
const { CiMusicNote1 } = icons;

const List = ({
  thumbnail,
  title,
  duration,
  order,
  sid,
  artistsNames,
  album,
}) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(sid));
        dispatch(actions.play(true));
        dispatch(
          actions.setRecentSong({
            thumbnail: thumbnail,
            sid,
            title: title,
            artists: artistsNames,
          })
        );
      }}
      className="flex justify-between w-full items-center cursor-pointer border-b hover:bg-gray-100 p-2 rounded-l-md rounded-r-md "
    >
      <div className="flex w-[48%] gap-2 items-center">
        {order ? (
          <span
            className={`text-white text-3xl ${
              order === 1
                ? `text-shadow-no${order}`
                : order === 2
                ? `text-shadow-no${order}`
                : order === 3
                ? `text-shadow-no${order}`
                : `text-shadow-rest`
            } w-[10%] flex items-center justify-center`}
          >
            {order}
          </span>
        ) : (
          <span className="mr-2 text-gray-500">
            <CiMusicNote1 size={16} />
          </span>
        )}
        <img
          className="w-[40px] h-[40px] object-contain mr-1 rounded-md"
          src={thumbnail}
        />
        <div className="flex flex-col gap-1">
          <span className="text-[14px] font-semibold">{`${
            title?.length > 30 ? `${title.slice(0, 30)}...` : `${title}`
          }`}</span>
          <div className="text-[12px] font-normal text-gray-400">
            {artistsNames}
          </div>
        </div>
      </div>
      <div className="text-[14px] flex-1 text-gray-400">
        {album
          ? `${album?.length > 30 ? `${album.slice(0, 30)}...` : `${album}`}`
          : ""}
      </div>
      <div className="text-[14px] text-gray-400 flex-[0_0_auto]">
        {moment.utc(duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(List);
