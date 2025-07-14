import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { List } from "./";

const Lists = ({ dataSong }) => {
  const { curSongId, songs } = useSelector((state) => state.music);
  console.log(songs);

  return (
    <div className="flex w-full flex-col ">
      {songs?.map((item) => (
        <div
          key={item.encodeId}
          className={
            item.encodeId === curSongId ? "bg-gray-100 rounded-md" : ""
          }
        >
          <List
            thumbnail={item.thumbnail}
            title={item.title}
            duration={item.duration}
            sid={item.encodeId}
            artistsNames={item.artistsNames}
            album={item.album?.title}
          />
        </div>
      ))}
      <div className="w-full p-[10px] ">
        <h3 className="font-bold">Thông tin</h3>
        <div className="flex gap-4 mt-3 items-center">
          <div className="flex flex-col gap-2 ">
            <span className="text-[15px] text-gray-500">Số bài hát</span>
            <span className="text-[15px] text-gray-500">Ngày phát hành</span>
            <span className="text-[15px] text-gray-500">Cung cấp bởi</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[15px]">{dataSong?.song.total}</span>
            <span className="text-[15px]">
              {moment.unix(dataSong?.contentLastUpdate).format("DD/MM/YYYY")}
            </span>
            <span className="text-[15px]">
              {dataSong?.song.items[0].distributor}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Lists);
