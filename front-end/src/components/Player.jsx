import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import icons from "../utils/icons";
import * as apis from "../apis";
const {
  MdSkipNext,
  MdSkipPrevious,
  CiHeart,
  HiOutlineDotsHorizontal,
  PiShuffle,
  IoMdPlay,
  CiRepeat,
  IoIosPause,
} = icons;

const Player = () => {
  const { curSongId, isPlaying } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [source, setSource] = useState(null);
  const audioEl = new Audio(source);
  // const [isPlaying, setIsPlaying] = useState(false);
  console.log(audioEl);

  useEffect(() => {
    const fetchData = async function () {
      const [res1, res2] = await Promise.all([
        apis.getDetailSong(curSongId),
        apis.getSong(curSongId),
      ]);
      if (res1?.data.err === 0) {
        setSongInfo(res1.data.data);
      }
      if (res2?.data.err === 0) {
        setSource(res2.data.data["128"]);
      }
    };
    fetchData();
  }, [curSongId]);

  const handleTogglePlayMusic = () => {
    // dispatch(actions.play(true));
  };
  useEffect(() => {
    audioEl.play();
  }, [curSongId]);

  return (
    <div className="w-ful h-full flex items-center cursor-pointer">
      <div className="w-[30%] h-full border border-green-500 flex items-center gap-3">
        <div>
          <img
            className="w-[64px] h-[64px] rounded-lg object cover"
            src={songInfo?.thumbnail}
            alt={songInfo?.title}
          />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-main-200">
            {songInfo?.title}
          </p>
          <p className="text-[12px] text-main-100">{songInfo?.artistsNames}</p>
        </div>
        <div className="flex items-center gap-4">
          <CiHeart title="Thêm vào thư viện" size={20} />
          <HiOutlineDotsHorizontal title="Xem thêm" size={20} />
        </div>
      </div>
      <div className="w-[40%] h-full border border-red-500 flex flex-col items-center justify-center hover:">
        <div className="flex gap-3 w-full justify-center items-center">
          <span title={"Bật phát ngẫu nhiên"}>
            <PiShuffle size={24} />
          </span>
          <span>
            <MdSkipPrevious size={24} />
          </span>
          <span
            onClick={handleTogglePlayMusic}
            className="border border-black hover:border-primary rounded-full p-2 hover:text-primary"
          >
            {isPlaying ? <IoIosPause size={24} /> : <IoMdPlay size={24} />}
          </span>
          <span>
            <MdSkipNext size={24} />
          </span>
          <span title={"Bật phát lại tất cả"}>
            <CiRepeat size={24} />
          </span>
        </div>
        <div>
          {/* <audio controls src={source}></audio> */}
          Progress bar
        </div>
      </div>
      <div className="w-[30%] h-full border border-blue-500 flex items-center">
        volumne
      </div>
    </div>
  );
};

export default Player;
