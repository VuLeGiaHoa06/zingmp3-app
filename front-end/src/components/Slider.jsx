import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import icons from "../utils/icons";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
const { IoMdPlay } = icons;

const Slider = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlePlayMusic = (item) => {
    dispatch(actions.setCurSongId(item.encodeId));
    dispatch(actions.play(true));
  };

  const handleClickBanner = (item) => {
    const albumPath = item.link.split(".")[0];
    navigate(albumPath);
  };

  return (
    <div className="w-full flex gap-5">
      {data?.map((item, index) => (
        <div
          key={item.encodeId}
          className={`h-[156px] bg-[#615D58] w-[50%] rounded-lg hover:cursor-pointer ${
            index <= 2 ? "block" : "hidden"
          }`}
        >
          <div className="w-full p-2 flex gap-4 items-center group">
            <div
              className="w-[40%] h-[140px] object-contain relative group overflow-hidden rounded-lg"
              onClick={() => handlePlayMusic(item)}
            >
              <img
                className="w-full h-full rounded-lg object-cover group-hover:scale-110 transition-transform duration-500"
                src={item.thumbnail}
                alt={item.title}
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 text-white flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-overlay-30">
                <span className="border border-white p-3 rounded-full">
                  <IoMdPlay size={28} />
                </span>
              </div>
            </div>
            <div
              className="w-[60%] flex flex-col gap-2"
              onClick={() => handleClickBanner(item)}
            >
              <span className="text-white font-bold text-xl">{item.title}</span>
              <span className="uppercase text-[#ACAAA6] font-bold text-sm">
                {item.artistsNames}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(Slider);
