import { useEffect, useState, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import icons from "../utils/icons";
import * as apis from "../apis";
import * as actions from "../store/actions";
import moment from "moment";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";
const {
  MdSkipNext,
  MdSkipPrevious,
  CiHeart,
  HiOutlineDotsHorizontal,
  PiShuffle,
  IoMdPlay,
  CiRepeat,
  IoIosPause,
  RiRepeatOneFill,
  BsMusicNoteList,
  PiMicrophoneStage,
  VscChromeRestore,
  LiaVolumeOffSolid,
  LiaVolumeUpSolid,
  LiaVolumeDownSolid,
  BsVolumeUp,
} = icons;

const Player = ({ setIsShowSidebarRight, isShowSidebarRight }) => {
  const dispatch = useDispatch();
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);

  const intervalId = useRef();
  const progressBar = useRef(0);
  const trackMousePosition = useRef();

  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [curTimeSong, setCurTimeSong] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  const [isVolume, setIsVolume] = useState(true);
  const [volume, setVolume] = useState(70);
  const [curIndexSong, setCurIndexSong] = useState(0);

  useEffect(() => {
    const fetchData = async function () {
      setLoadingSpinner(false);
      const [res1, res2] = await Promise.all([
        apis.getDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      setLoadingSpinner(true);
      if (res1?.data.err === 0) {
        setSongInfo(res1.data.data);
      }
      if (res2?.data.err === 0) {
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        setAudio(new Audio());
        dispatch(actions.play(false));
        setCurTimeSong(0);
        toast.warn(res2.data.msg);
      }
    };
    fetchData();
  }, [curSongId]);

  useEffect(() => {
    let currentIndexSong;
    songs?.forEach((item, index) => {
      if (item.encodeId === curSongId) {
        currentIndexSong = index;
      }
    });
    setCurIndexSong(currentIndexSong);
  }, [curSongId, curIndexSong]);

  useEffect(() => {
    audio.load();
    if (isPlaying) {
      audio.play();
    }

    return () => {
      audio.pause();
    };
  }, [audio, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      intervalId.current = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
        progressBar.current.style.cssText = `right: ${100 - percent}%`;
        setCurTimeSong(Math.round(audio.currentTime));
      }, 200);
    }
    return () => {
      clearInterval(intervalId.current);
    };
  }, [isPlaying, audio]);

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleNextSong() : handleRepeatOne();
      } else {
        console.log("end");
        audio.pause();
        dispatch(actions.play(false));
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffle, repeatMode]);

  useEffect(() => {
    audio.volume = +volume / 100;
  }, [volume]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      console.log("pause");

      audio.pause();
      dispatch(actions.play(false));
    } else {
      console.log("play");

      audio.play();
      dispatch(actions.play(true));
    }
  };

  const handleProgressBar = (e) => {
    const { left, width } = trackMousePosition.current.getBoundingClientRect();
    const percent = Math.round(((e.clientX - left) * 10000) / width) / 100;
    progressBar.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    setCurTimeSong(Math.round(audio.currentTime));
  };

  const handleNextSong = () => {
    console.log("next");
    if (songs) {
      let currentSongIndex;
      songs.forEach((item, index) => {
        if (item.encodeId === curSongId) {
          currentSongIndex = index;
        }
      });

      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handlePrevSong = () => {
    console.log("prev");
    if (songs) {
      let currentSongIndex;
      songs.forEach((item, index) => {
        if (item.encodeId === curSongId) {
          currentSongIndex = index;
        }
      });

      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleRepeatOne = () => {
    audio.play();
  };

  const handleShuffle = () => {
    const random = Math.round(Math.random() * songs?.length - 1);
    dispatch(actions.setCurSongId(songs[random].encodeId));
    dispatch(actions.play(true));
  };

  const handleChangeVolume = (e) => {
    setVolume(e.target.value);

    if (+e.target.value === 0) {
      setIsVolume(false);
    } else {
      setIsVolume(true);
    }
  };

  const handleToggleVolume = () => {
    setIsVolume((prev) => !prev);
    if (volume > 0) {
      setVolume(0);
    } else if (volume === 0) {
      setVolume(50);
    }
  };

  return (
    <div className="w-ful h-full flex items-center cursor-pointer">
      <div className="w-[30%] h-full flex items-center gap-3">
        <div>
          <img
            className="w-[64px] h-[64px] rounded-lg object cover"
            src={songInfo?.thumbnail}
            alt={songInfo?.title}
          />
        </div>
        <div>
          <p className="text-[14px] font-semibold">{songInfo?.title}</p>
          <p className="text-[12px] text-main-100">{songInfo?.artistsNames}</p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          <CiHeart title="Thêm vào thư viện" size={20} />
          <HiOutlineDotsHorizontal title="Xem thêm" size={20} />
        </div>
      </div>
      <div className="w-[40%] h-full flex flex-col gap-1 items-center justify-center">
        <div className="flex gap-4 w-full justify-center items-center">
          <span
            onClick={() => setIsShuffle((prev) => !prev)}
            title={`${
              isShuffle ? "Tắt phát ngẫu nhiên" : "Bật phát ngẫu nhiên"
            }`}
            className={`${isShuffle ? "text-primary" : ""}`}
          >
            <PiShuffle size={24} />
          </span>
          <span
            className={`${
              curIndexSong === 0 && "cursor-not-allowed text-gray-400"
            }`}
            onClick={handlePrevSong}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            onClick={handleTogglePlayMusic}
            className="border border-black hover:border-primary rounded-full p-2 hover:text-primary"
          >
            {!loadingSpinner ? (
              <LoadingSpinner />
            ) : isPlaying ? (
              <IoIosPause size={24} />
            ) : (
              <IoMdPlay size={24} />
            )}
          </span>
          <span
            className={`${
              curIndexSong === songs?.length - 1 &&
              "cursor-not-allowed text-gray-400"
            }`}
            onClick={handleNextSong}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            className={`${repeatMode && "text-primary"}`}
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
            title={"Bật phát lại tất cả"}
          >
            {repeatMode === 2 ? (
              <RiRepeatOneFill size={24} />
            ) : (
              <CiRepeat size={24} />
            )}
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-3">
          <span className="text-[12px]">
            {moment.utc(curTimeSong * 1000).format("mm:ss")}
          </span>
          <div
            onClick={handleProgressBar}
            ref={trackMousePosition}
            className="w-full h-[3px] bg-gray-200 rounded-lg relative hover:h-[6px]"
          >
            <div
              ref={progressBar}
              className="absolute left-0 bottom-0 top-0 bg-[#8D22C3] rounded-lg "
            ></div>
          </div>
          <span className="text-[12px]">
            {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
          </span>
        </div>
      </div>
      <div className="w-[30%] h-full flex items-center gap-6 justify-end">
        <div className="flex gap-4 text-gray-600">
          <span>
            <PiMicrophoneStage size={16} />
          </span>
          <span>
            <VscChromeRestore size={16} />
          </span>
          <div className="flex gap-2 items-center">
            <span onClick={handleToggleVolume}>
              {+volume >= 34 && isVolume ? (
                +volume >= 67 ? (
                  <BsVolumeUp size={16} />
                ) : (
                  <LiaVolumeUpSolid size={16} />
                )
              ) : +volume === 0 ? (
                <LiaVolumeOffSolid size={16} />
              ) : (
                <LiaVolumeDownSolid size={16} />
              )}
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={handleChangeVolume}
            />
          </div>
        </div>
        <div className="border-l-[2px] h-[33px] border-gray-100"></div>
        <span
          onClick={() => setIsShowSidebarRight((prev) => !prev)}
          className={`p-2 flex justify-center items-center rounded-md ${
            isShowSidebarRight
              ? "text-white bg-primary hover:bg-[#7F1FAF]"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <BsMusicNoteList size={16} />
        </span>
      </div>
    </div>
  );
};

export default memo(Player);
