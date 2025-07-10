import React, { useEffect, useState, useRef } from "react";
import * as apis from "../../apis";
import { useParams } from "react-router-dom";
import icons from "../../utils/icons";
const { IoPersonAdd, IoMdPlay, MdNavigateNext } = icons;
import { List, Section } from "../../components";
import { useSelector } from "react-redux";

const Profile = () => {
  const { curSongId } = useSelector((state) => state.music);
  const { profile } = useParams();
  const [artistData, setArtistData] = useState({});
  const scrollTopRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await apis.apiGetAritst(profile);
      if (res?.data?.err === 0) {
        setArtistData(res.data.data);
      }
    };
    fetchData();
  }, [profile]);

  useEffect(() => {
    scrollTopRef.current.scrollIntoView({ block: "start", inline: "nearest" });
  }, [profile]);

  return (
    <div className="w-full">
      <div ref={scrollTopRef} className="w-full relative mb-[40px]">
        <img
          className="object-cover w-full h-[410px]"
          src={artistData?.cover}
          alt={artistData?.title}
        />
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent"></div>
        <div className="flex flex-col gap-2 absolute bottom-[20px] text-white px-[59px]">
          <div className="flex items-center gap-4">
            <span className="text-[60px] font-bold">{artistData?.name}</span>
            <span className="p-6 rounded-full bg-white relative group text-primary">
              <span className="absolute top-0 right-0 left-0 bottom-0 group-hover:scale-100 duration-500 p-3 group-hover:text-white group-hover:bg-primary rounded-full">
                <IoMdPlay size={24} />
              </span>
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <span>{`${artistData?.totalFollow
              ?.toLocaleString()
              ?.replace(",", ".")} người quan tâm`}</span>
            <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.2)] px-4 py-1 text-white rounded-l-full rounded-r-full w-fit cursor-pointer">
              <span>
                <IoPersonAdd size={16} />
              </span>
              <button className="uppercase text-[12px] font-semibold">
                Quan tâm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[59px] flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <div className="flex w-full justify-between ">
            <h3 className="text-[20px] font-bold">
              {artistData.sections
                ?.find((item) => item.sectionId === "aSongs")
                .title.split(" ")
                .map((item) => `${item[0].toUpperCase()}${item.slice(1)} `)}
            </h3>
            <div className="hover:text-primary flex items-center gap-1 cursor-pointer">
              <span className="uppercase text-[12px]">tất cả</span>
              <span>
                <MdNavigateNext size={20} />
              </span>
            </div>
          </div>
          <div className="flex flex-wrap w-full justify-between">
            {artistData.sections
              ?.find((item) => item.sectionId === "aSongs")
              ?.items?.filter((_, index) => index < 6)
              .map((item) => (
                <div
                  key={item.encodeId}
                  className={`${
                    item.encodeId === curSongId && "bg-gray-100 rounded-md"
                  } w-[49%]`}
                >
                  <List
                    thumbnail={item.thumbnail}
                    title={item.title}
                    duration={item.duration}
                    sid={item.encodeId}
                    artistsNames={item.artistsNames}
                  />
                </div>
              ))}
          </div>
        </div>
        <div>
          <Section
            data={
              artistData.sections?.find((item) => item.sectionId === "aSingle")
                ?.items
            }
            title={"Single & EP"}
          />
        </div>
        <div>
          <Section
            data={
              artistData.sections?.find((item) => item.sectionId === "aAlbum")
                ?.items
            }
            title={"Album"}
          />
        </div>
        <div>
          <Section
            data={
              artistData.sections?.find(
                (item) => item.sectionId === "aPlaylist"
              )?.items
            }
            title={"Tuyển tập"}
          />
        </div>
        <div>
          <Section
            data={
              artistData.sections?.find(
                (item) => item.title === "Xuất hiện trong"
              )?.items
            }
            title={"Xuất hiện trong"}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-[20px] font-bold">{`Về ${artistData?.name}`}</h3>
          <div className="flex gap-6">
            <div className="w-[600px] h-[400px] rounded-md relative overflow-hidden flex-none">
              <img
                className="absolute top-0 right-0 left-0 rounded-md "
                src={artistData?.thumbnailM}
                alt={artistData?.title}
              />
            </div>
            <div className="flex-auto flex flex-col gap-8">
              <p
                className="text-[16px] text-gray-600"
                dangerouslySetInnerHTML={{ __html: artistData?.biography }}
              >
                {/* {artistData?.biography?.length > 494
                  ? artistData?.biography
                      ?.slice(0, 494)
                      ?.split("<br>")
                      .map((item, index) => <p key={index}>{item}</p>)
                  : artistData?.biography
                      ?.split("<br>")
                      .map((item, index) => <p key={index}>{item}</p>)} */}
              </p>
              <div className="flex flex-col">
                <h3 className="text-[20px] font-bold">
                  {artistData?.totalFollow?.toLocaleString().replace(",", ".")}
                </h3>
                <span className="text-[16px] text-gray-600">
                  Người quan tâm
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[90px]"></div>
    </div>
  );
};

export default Profile;
