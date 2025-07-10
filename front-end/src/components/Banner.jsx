import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import icons from "../utils/icons";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SiTrueup } from "react-icons/si";
const { IoMdPlay } = icons;

const Banner = ({ data }) => {
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

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {data?.map((item) => (
          <div key={item.encodeId} className="px-4 w-full">
            <div className="h-[156px] bg-primary rounded-lg hover:cursor-pointer w-full flex gap-4 items-center group p-4">
              <div
                className="w-[132px] h-[132px] relative group overflow-hidden rounded-md"
                onClick={() => handlePlayMusic(item)}
              >
                <div className="absolute top-0 bottom-0 left-0 right-0 text-white  flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-overlay-30">
                  <span className="border border-white p-3 rounded-full">
                    <IoMdPlay size={28} />
                  </span>
                </div>
                <img
                  className="w-full h-full rounded-lg object-cover hover:scale-110 transition-transform duration-500"
                  src={item.thumbnail}
                  alt={item.title}
                />
              </div>
              <div
                className="w-[60%] flex flex-col gap-2"
                onClick={() => handleClickBanner(item)}
              >
                <span className="text-white font-bold text-xl">
                  {item.title}
                </span>
                <span className="uppercase text-[#ACAAA6] font-bold text-sm">
                  {item.artistsNames}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default memo(Banner);
