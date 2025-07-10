import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Section } from "../../components";
import * as apis from "../../apis";

const SearchPlaylist = () => {
  const { searchData } = useSelector((state) => state.music);

  const [playList, setPlayList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apis.apiGetAritst(searchData?.top?.alias);
      if (res?.data?.err === 0) {
        setPlayList(
          res.data.data.sections.find((item) => item.sectionId === "aSingle")
            .items
        );
      }
    };
    fetchData();
  }, [searchData]);

  return (
    <div className="w-full flex flex-col gap-3">
      <Section
        data={playList}
        title={"Playlist/Album"}
        mountItem={playList.length - 1}
      />
      <div className="w-full h-[90px]"></div>
    </div>
  );
};

export default SearchPlaylist;
