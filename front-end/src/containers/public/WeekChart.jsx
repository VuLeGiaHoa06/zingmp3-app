import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import icons from "../../utils/icons";
const { IoMdPlay } = icons;
import * as apis from "../../apis";
import { List } from "../../components";
import Scrollbars from "react-custom-scrollbars-2";

const nonActiveStyle =
  "uppercase font-normal text-[16px] h-full flex items-center";
const activeStyle =
  "uppercase font-normal text-[16px] text-primary border-b-[3px] border-b-primary h-full flex items-center";

const WeekChart = () => {
  const [dataChart, setDataChart] = useState(null);
  const [genreSong, setGenreSong] = useState([]);
  console.log(dataChart?.weekChart);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apis.apiGetChartHome();
      if (res?.data?.err === 0) {
        setDataChart(res.data.data);
      }
    };
    fetchData();
  }, []);
  console.log(genreSong);

  const handleGenreSong = (id) => {
    if (id === "vn") {
      setGenreSong(dataChart?.weekChart.vn.items);
    } else if (id === "us") {
      setGenreSong(dataChart?.weekChart.us.items);
    } else if (id === "kored") {
      setGenreSong(dataChart?.weekChart.korea.items);
    }
  };

  return (
    <div className="w-full pt-[30px] px-[59px] flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <h3 className="text-[40px] font-bold text-primary">
          Bảng Xếp Hạng Tuần
        </h3>
        <span className="p-3 bg-primary rounded-full flex hover:bg-[#7F1FAF] cursor-pointer text-white">
          <IoMdPlay size={24} />
        </span>
      </div>
      <div className="flex gap-8 items-center h-[59px]">
        {dataChart?.weekChart &&
          Object.entries(dataChart?.weekChart).map((item) => (
            <NavLink
              key={item[1].chartId}
              to={item[1].link.split(".")[0]}
              className={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              onClick={() => handleGenreSong(item[0])}
            >
              <span className="text-[24px] font-bold uppercase">
                {item[0] === "vn"
                  ? "Việt Nam"
                  : item[0] === "us"
                  ? "US-UK"
                  : "K-POP"}
              </span>
            </NavLink>
          ))}
      </div>
      <div className="w-full h-[600px]">
        <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
          {genreSong?.map((item, index) => (
            <div key={item.encodeId}>
              <List
                thumbnail={item.thumbnail}
                title={item.title}
                duration={item.duration}
                sid={item.encodeId}
                artistsNames={item.artistsNames}
                album={item.album?.title}
                order={index + 1}
              />
            </div>
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};

export default WeekChart;
