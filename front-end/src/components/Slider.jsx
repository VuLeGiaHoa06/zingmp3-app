import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";
import icons from "../utils/icons";
const { BsPlayCircle } = icons;

const Slider = () => {
  const dispatch = useDispatch();
  const { banner } = useSelector((state) => state.app);

  const handleClickBanner = (item) => {
    dispatch(actions.setCurSongId(item.encodeId));
    dispatch(actions.play(true));
  };

  return (
    <div className="w-full flex gap-5 ">
      {banner.length > 0 &&
        banner
          .map((item) => (
            <div
              key={item.encodeId}
              className=" h-[156px] bg-[#615D58] w-[50%] rounded-lg hover:cursor-pointer"
              onClick={() => handleClickBanner(item)}
            >
              <div className="w-full p-2 flex gap-4 items-center group">
                <div className="w-[40%] h-[140px] object-contain relative">
                  <img
                    className="w-full h-full rounded-lg object-cover"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100">
                    <BsPlayCircle size={48} />
                  </div>
                </div>
                <div className="w-[60%] flex flex-col gap-2">
                  <span className="text-white font-bold text-xl">
                    {item.title}
                  </span>
                  <span className="uppercase text-[#ACAAA6] font-bold text-sm">
                    {item.artistsNames}
                  </span>
                </div>
              </div>
            </div>
          ))
          .slice(0, 3)}
    </div>
  );
};

export default Slider;
