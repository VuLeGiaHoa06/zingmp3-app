import moment from "moment";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const notActiveStyle =
  "flex w-full justify-between p-[10px] border-t border-b  hover:bg-gray-100 hover:rounded-md cursor-pointer";
const activeStyle =
  "flex w-full justify-between p-[10px] border-t border-b bg-gray-100 rounded-md";

const Lists = ({ dataSong }) => {
  const dispatch = useDispatch();
  const { curSongId, songs } = useSelector((state) => state.music);

  return (
    <div className="flex  w-full flex-col ">
      {songs?.map((item, index) => (
        <div
          key={item.encodeId}
          className={item.encodeId === curSongId ? activeStyle : notActiveStyle}
          onClick={() => {
            dispatch(actions.setCurSongId(item.encodeId));
            dispatch(actions.play(true));
          }}
        >
          <div className="flex gap-2 items-center">
            <div className="mr-2 text-gray-500">{index + 1}</div>
            <img
              className="w-[40px] h-[40px] object-contain mr-1 rounded-md"
              src={item.thumbnail}
            />
            <div className="font-semibold uppercase text-[14px] flex flex-col gap-1">
              <span>{item.title}</span>
              <div className="flex gap-1">
                {item.artists.map((item) => (
                  <div
                    className="text-[11px] font-normal text-gray-400"
                    key={item.id}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-[14px] text-gray-400">
            {moment.utc(item.duration * 1000).format("mm:ss")}
          </div>
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
