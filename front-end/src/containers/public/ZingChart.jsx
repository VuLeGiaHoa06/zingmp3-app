import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import * as apis from "../../apis";
import icons from "../../utils/icons";
const { IoMdPlay } = icons;
import { SongItem, List, WeekChartBox } from "../../components";
import _ from "lodash";
import weekChartLogo from "../../assets/week-chart-bg.jpg";

const ZingChart = () => {
  const [dataChart, setDataChart] = useState(null);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);
  const [isShowFull, setIsShowFull] = useState(false);
  const [songs, setSongs] = useState([]);
  // const [weekChart, setWeekChart] = useState([]);
  // console.log(Object.entries(dataChart?.weekChart));
  console.log(dataChart);
  

  const [toolTipState, setToolTipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(255,255,255,0.2)", drawTicks: false },
        min: dataChart?.RTChart?.chart?.minScore,
        max: dataChart?.RTChart?.chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "#A7A7A7" },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip }) => {
          // console.log(tooltip);

          if (tooltip.opacity === 0) {
            if (toolTipState.opacity !== 0) {
              setToolTipState((prev) => ({ ...prev, opacity: 0 }));
            }
            return;
          }

          const newToolTipData = {
            opacity: 1,
            left: tooltip.caretX,
            top: tooltip.caretY,
          };

          if (!_.isEqual(newToolTipData, toolTipState))
            setToolTipState(newToolTipData);

          const data = [];
          for (let i = 0; i < 3; i++) {
            data.push({
              encodeId: Object.keys(dataChart?.RTChart?.chart?.items)[i],
              data: dataChart?.RTChart?.chart?.items[
                Object.keys(dataChart?.RTChart?.chart?.items)[i]
              ]
                .filter((item) => item.hour % 2 === 0)
                .map((item) => item.counter),
            });
          }
          const getEncodeId = data.find((item) =>
            item.data.some(
              (item) =>
                item === +tooltip?.body?.[0]?.lines?.[0].replace(",", "")
            )
          ).encodeId;
          setSelected(getEncodeId);
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await apis.apiGetChartHome();
      if (res?.data?.err === 0) {
        setDataChart(res.data.data);
        setSongs(res.data.data.RTChart.items.filter((_, index) => index < 10));
        // setWeekChart(Object.keys(res.data.data.weekChart));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const labels = dataChart?.RTChart?.chart?.times
      ?.filter((item) => item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (dataChart?.RTChart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: dataChart?.RTChart?.chart?.items[
            Object.keys(dataChart?.RTChart?.chart?.items)[i]
          ]
            ?.filter((item) => item.hour % 2 === 0)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          tension: 0.2,
          borderWidth: 2,
          pointHoverRadius: 5,
          pointBackgroundColor: "white",
          pointHitRadius: 5,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          animation: false,
          pointHoverBorderWidth: 3,
        });
      }
    }

    setData({ labels, datasets });
  }, [dataChart]);

  const handleShowFull = () => {
    setIsShowFull((prev) => !prev);
    if (isShowFull) {
      setSongs(dataChart?.RTChart?.items.filter((_, index) => index < 10));
    } else {
      setSongs(dataChart?.RTChart?.items);
    }
  };

  return (
    <>
      <div className="px-[59px] flex flex-col mt-[49px] gap-6">
        <div className="flex gap-4 items-center h-[48px]">
          <h3 className="text-[40px] h-full inline-block text-transparent bg-clip-text font-bold text-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            #zingchart
          </h3>
          <span className="p-2 bg-white rounded-full flex hover:bg-gray-300 shadow-lg cursor-pointer">
            <IoMdPlay size={24} />
          </span>
        </div>
        <div className="h-[300px]">
          <div className="flex-6 border border-white h-full relative">
            {data && <Line data={data} options={options} />}
            <div
              // className="tooltip"
              style={{
                top: toolTipState.top,
                left: toolTipState.left,
                position: "absolute",
                opacity: toolTipState.opacity,
              }}
            >
              <SongItem
                thumbnail={
                  dataChart?.RTChart?.items.find(
                    (item) => item.encodeId === selected
                  )?.thumbnailM
                }
                title={
                  dataChart?.RTChart?.items.find(
                    (item) => item.encodeId === selected
                  )?.title
                }
                artist={
                  dataChart?.RTChart?.items.find(
                    (item) => item.encodeId === selected
                  )?.artistsNames
                }
                sid={
                  dataChart?.RTChart?.items.find(
                    (item) => item.encodeId === selected
                  )?.encodeId
                }
                style={"bg-white"}
              />
            </div>
          </div>
        </div>
        <div>
          {songs?.map((item, index) => (
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
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            className="px-4 py-2 bg-primary text-white hover:bg-[#7F1FAF] rounded-l-full rounded-r-full"
            onClick={handleShowFull}
            type="button"
          >
            {!isShowFull ? "Xem thêm" : "Ẩn bớt"}
          </button>
        </div>
        <div className="w-full h-[30px]"></div>
      </div>
      <div className="relative w-full h-full">
        <div className="absolute top-0 right-0 left-0 bottom-0">
          <img
            className="w-full h-full object-cover grayscale"
            src={weekChartLogo}
            alt=""
          />
        </div>
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-[hsla(0,0%,100%,.9)]"></div>
        <div className="absolute top-0 right-0 left-0 bottom-0 px-[59px] py-[50px] flex flex-col gap-4">
          <h3 className="text-[40px] font-bold text-primary">
            Bảng Xếp Hạng Tuần
          </h3>
          <div className="flex gap-6 flex-1">
            {dataChart?.weekChart &&
              Object.entries(dataChart?.weekChart).map((item) => {
                if (item[0] === "vn") {
                  return (
                    <WeekChartBox
                      key={item[0]}
                      data={item[1]}
                      title={"Việt Nam"}
                    />
                  );
                }
                if (item[0] === "us") {
                  return (
                    <WeekChartBox
                      key={item[0]}
                      data={item[1]}
                      title={"US-UK"}
                    />
                  );
                }
                if (item[0] === "korea") {
                  return (
                    <WeekChartBox
                      key={item[0]}
                      data={item[1]}
                      title={"K-Pop"}
                    />
                  );
                }
              })}
            {/* <WeekChartBox data={} title={"Việt Nam"} />
            <WeekChartBox title={"US-UK"} />
            <WeekChartBox title={"K-Pop"} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ZingChart;
