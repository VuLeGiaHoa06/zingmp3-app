import React, { memo } from "react";
import icons from "../utils/icons";
import { Link, useNavigate } from "react-router-dom";

const { MdNavigateNext, IoMdPlay, CiHeart, PiDotsThreeBold } = icons;

const Section = ({ data, title, mountItem }) => {
  const navigate = useNavigate();
  const number = mountItem || 4;
  // console.log(data);

  return (
    <div className="flex flex-col gap-4 mt-[10px]">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-[20px]">{title}</h3>
        {data?.length > 5 ? (
          <div className="flex items-center justify-center hover:text-primary cursor-pointer">
            <span className="uppercase text-[12px]">tất cả</span>
            <span>
              <MdNavigateNext size={24} />
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-wrap">
        {data
          ?.filter((_, index) => index <= number)
          .map((item) => (
            <div
              key={item.encodeId}
              className="w-[20%] px-4 flex flex-col gap-3"
            >
              <div
                onClick={() =>
                  navigate(
                    item.link.slice(0, 7) === "/album/"
                      ? item.link.split(".")[0]
                      : item.album.link.split(".")[0],
                    { state: { playAlbum: false } }
                  )
                }
                className="w-full overflow-hidden rounded-md relative group cursor-pointer"
              >
                <img
                  className="w-full h-full object-contain rounded-md group-hover:scale-110 transition-transform duration-500"
                  src={item.thumbnailM}
                  alt=""
                />
                <div className="absolute top-0 bottom-0 right-0 left-0 flex items-center gap-4 opacity-0 hover:opacity-100 justify-center text-white hover:bg-overlay-30">
                  <span className="p-[2px] rounded-full">
                    <CiHeart size={28} />
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        item.link.slice(0, 7) === "/album/"
                          ? item.link.split(".")[0]
                          : item.album.link.split(".")[0],
                        { state: { playAlbum: true } }
                      );
                    }}
                    className="border border-white p-3 rounded-full hover:text-gray-200 hover:border-gray-200"
                  >
                    <IoMdPlay size={28} />
                  </span>
                  <span>
                    <PiDotsThreeBold size={28} />
                  </span>
                </div>
              </div>
              <div className="text-[14px]">
                <h3 className="font-bold">{`${
                  item.title.length > 25
                    ? `${item.title.slice(0, 25)}...`
                    : `${item.title}`
                }`}</h3>
                <span className="text-gray-500">
                  {`${item?.artists
                    ?.map(
                      (item) =>
                        `${
                          item.name.length > 50
                            ? `${item.name.slice(0, 50)}...`
                            : item.name
                        }`
                    )
                    .join(", ")}`}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(Section);
