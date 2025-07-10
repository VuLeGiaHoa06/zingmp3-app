import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "../../components";
import { getSearchSong } from "../../store/actions";

const SearchSong = () => {
  const { searchData, searchSong } = useSelector((state) => state.music);
  const dispatch = useDispatch();

  console.log(searchData);

  useEffect(() => {
    const fetchData = () => {
      dispatch(getSearchSong(searchData?.top?.id));
    };
    fetchData();
  }, [searchData]);

  return (
    <div className="w-full flex flex-col">
      <h3 className="text-[20px] font-bold">Bài Hát</h3>
      {searchSong?.map((item) => (
        <List
          key={item.encodeId}
          thumbnail={item.thumbnail}
          title={item.title}
          duration={item.duration}
          sid={item.encodeId}
          artistsNames={item.artistsNames}
          album={item?.album?.title}
        />
      ))}
      <div className="w-full h-[90px]"></div>
    </div>
  );
};

export default SearchSong;
