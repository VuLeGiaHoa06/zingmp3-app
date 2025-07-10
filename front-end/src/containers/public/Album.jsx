import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import icons from "../../utils/icons";
import { Lists, LoadingAudio } from "../../components/";
import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const { BiSortAlt2, IoMdPlay, CiHeart, PiDotsThreeBold } = icons;

const Album = () => {
  const { pid } = useParams();
  const location = useLocation();

  const dispatch = useDispatch();
  const { isPlaying } = useSelector((state) => state.music);

  const [dataSong, setDataSong] = useState(null);
  // console.log(dataSong);

  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid));

    const fetchData = async () => {
      dispatch(actions.loading(false));
      const res = await apis.apiGetDetailPlaylist(pid);
      dispatch(actions.loading(true));

      if (res?.data.err === 0) {
        setDataSong(res.data.data);
        dispatch(actions.playList(res.data.data.song.items));
        // dispatch(actions.curSongData(res.data.data));
      }
    };
    fetchData();
  }, [pid]);

  useEffect(() => {
    // console.log(location.state);

    if (location.state?.playAlbum) {
      const randomSong = Math.round(
        Math.random() * dataSong?.song?.items.length - 1
      );

      dispatch(
        actions.setCurSongId(dataSong?.song?.items?.[randomSong].encodeId)
      );
      dispatch(actions.play(true));
    }
  }, [pid, dataSong]);

  return (
    <div className="flex gap-8 px-[59px] justify-between w-full overflow-y-scroll">
      <div className="w-[25%] flex flex-col items-center gap-4">
        <div
          className={`w-[300px] h-[300px] shadow-lg overflow-hidden relative cursor-pointer group ${
            isPlaying ? "rounded-full" : "rounded-lg"
          }`}
        >
          <img
            className={`${
              isPlaying
                ? "rounded-full animate-rotate-center"
                : "animate-rotate-center-pause rounded-md"
            } w-full h-full object-contain shadow-lg group-hover:scale-110 transition-transform duration-300`}
            src={dataSong?.thumbnailM}
            alt={dataSong?.title}
          />
          <div
            className={`absolute top-0 bottom-0 left-0 right-0 text-white hover:bg-overlay-30 hover:opacity-100 flex items-center justify-center ${
              isPlaying ? "rounded-full" : "opacity-0"
            }`}
          >
            <span className="border border-white rounded-full p-3">
              {isPlaying ? <LoadingAudio /> : <IoMdPlay size={24} />}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center text-center">
          <div className="text-[20px] font-bold uppercase text-center">
            {dataSong?.title}
          </div>
          <div className="text-gray-500 text-[12px]">
            <span>Cập nhật: </span>
            {moment.unix(dataSong?.contentLastUpdate).format("DD/MM/YYYY")}
          </div>
          <div className="text-[12px] flex gap-2 text-gray-500">
            {dataSong?.artists.map((item) => item.name).join(", ")}
          </div>
          <div className="text-[12px] flex gap-1 text-gray-500">
            {`${
              String(dataSong?.like).length >= 7
                ? `${String(dataSong?.like).slice(0, 1)}TR`
                : `${String(dataSong?.like).slice(0, 3)}K`
            }`}
            <span>người yêu thích</span>
          </div>
        </div>
        <div>
          <button className="w-[170px] h-[35px] bg-primary text-white rounded-3xl flex justify-center items-center gap-1 hover:bg-[#7F1FAF]">
            <span>
              <IoMdPlay size={16} />
            </span>
            <span className="uppercase">Phát tất cả</span>
          </button>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <span
            title="Thêm vào thư viện"
            className="w-[35px] h-[35px] bg-gray-100 rounded-full flex justify-center items-center cursor-pointer"
          >
            <CiHeart size={16} />
          </span>
          <span
            title="Khác"
            className="w-[35px] h-[35px] bg-gray-100 rounded-full flex justify-center items-center cursor-pointer"
          >
            <PiDotsThreeBold size={16} />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[75%]">
        {dataSong?.description && (
          <div className="flex">
            <span>
              <span className="mr-1 text-gray-700">Lời tựa</span>
              {dataSong?.description}
            </span>
          </div>
        )}

        <div className="flex flex-col h-full">
          <div className="flex justify-between p-[10px]">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">
                {dataSong?.song.total > 1 ? <BiSortAlt2 size={12} /> : ""}
              </span>
              <span className="text-gray-500 text-[12px] uppercase font-medium">
                Bài hát
              </span>
            </div>
            <div className="text-gray-500 text-[12px] uppercase font-medium">
              Album
            </div>
            <div className="text-gray-500 text-[12px] uppercase font-medium">
              Thời gian
            </div>
          </div>
          <Scrollbars autoHide style={{ width: "100%", height: "80%" }}>
            <Lists dataSong={dataSong} />
          </Scrollbars>
        </div>
      </div>
    </div>
  );
};

export default Album;
