import React, { memo } from "react";
import icons from "../utils/icons";
import moment from "moment";
import "moment/dist/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { LoadingAudio } from "./";

const { IoMdPlay, PiDotsThreeBold } = icons;

const SongItem = ({
  thumbnail,
  title,
  sid,
  artist,
  releaseDate,
  order,
  percent,
}) => {
  const { isPlaying, curSongId } = useSelector((state) => state.music);

  const dispatch = useDispatch();
  return (
    <div
      className={`${
        order ? "w-full" : "w-[45%] min-[1024px]:w-[30%]"
      } flex-auto flex p-2 justify-between items-center hover:bg-gray-100 group rounded-md`}
    >
      <div className="flex gap-2 items-center">
        {order && <span>{order}</span>}
        <div
          onClick={() => {
            dispatch(actions.setCurSongId(sid));
            dispatch(actions.play(!isPlaying));
          }}
          className="relative"
        >
          <img
            className="w-[60px] h-[60px] rounded-md"
            src={thumbnail}
            alt={title}
          />
          <div
            className={`absolute top-0 bottom-0 left-0 right-0 flex cursor-pointer items-center justify-center text-white group-hover:bg-overlay-30 group-hover:rounded-md opacity-0 group-hover:opacity-100 ${
              sid === curSongId && "opacity-100"
            }`}
          >
            <span className="hover:text-gray-200 ">
              {isPlaying ? <LoadingAudio size={16} /> : <IoMdPlay size={16} />}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-[14px] font-medium">{title}</span>
          <span className="text-[12px] text-gray-500">{artist}</span>
          {order ? (
            ""
          ) : (
            <span className="text-[12px] text-gray-500">
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      {percent ? (
        <span>100%</span>
      ) : (
        <div className="hover:bg-gray-200 cursor-pointer p-2 rounded-full group-hover:opacity-100 opacity-0">
          <span>
            <PiDotsThreeBold size={20} />
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(SongItem);
