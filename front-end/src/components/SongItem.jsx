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
  style,
}) => {
  const { isPlaying, curSongId } = useSelector((state) => state.music);

  const dispatch = useDispatch();
  return (
    <div
      className={`flex-auto flex p-[10px] justify-between items-center group rounded-md ${style}`}
    >
      <div className="flex gap-4 items-center">
        {order && (
          <span className={`text-[#5A2E78] text-3xl text-shadow-no${order}`}>
            {order}
          </span>
        )}
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
        <div
          className={`${
            order && "text-[hsla(0,0%,100%,.5)]"
          } flex flex-col justify-between `}
        >
          <span className="text-[14px] font-medium">{title}</span>
          <span className="text-[12px]">{`${
            artist?.length > 30 ? `${artist.slice(0, 30)}...` : artist
          }`}</span>
          {releaseDate && (
            <span className="text-[12px] text-gray-500">
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      {percent ? (
        <span className="text-white text-[16px] font-semibold">{`${percent}%`}</span>
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
