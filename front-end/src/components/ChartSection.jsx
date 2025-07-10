import React, { memo, useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import SongItem from "./SongItem";
import { useSelector } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import path from "../utils/path";
import icons from "../utils/icons";
const { IoMdPlay } = icons;

const ChartSection = () => {
  const { chart, rank } = useSelector((state) => state.app);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);
  const chartRef = useRef();
  const [toolTipState, setToolTipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });

  // console.log(chart?.items?.[Object.keys(chart?.items)[0]]);

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(255,255,255,0.2)", drawTicks: false },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "white" },
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
              encodeId: Object.keys(chart?.items)[i],
              data: chart?.items[Object.keys(chart?.items)[i]]
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
    const labels = chart?.times
      ?.filter((item) => item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
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
  }, [chart]);

  return (
    <div className="w-full  min-h-[400px] bg-[#4E1E6E] relative rounded-lg">
      <div className="absolute top-0 right-0 bottom-0 left-0 p-5 flex flex-col gap-4">
        <Link to={path.ZINGCHART}>
          <div className="flex gap-2 items-center">
            <h3 className="inline-block text-transparent bg-clip-text font-bold text-white text-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              #zingchart
            </h3>
            <span className="p-1 bg-white rounded-full flex hover:bg-opacity-90">
              <IoMdPlay size={12} />
            </span>
          </div>
        </Link>
        <div className="flex gap-7 h-[250px]">
          <div className="flex-4 flex flex-col gap-5">
            <div className="flex flex-col gap-2 w-full h-full">
              {rank
                ?.filter((_, index) => index <= 2)
                ?.map((item, index) => (
                  <SongItem
                    key={item.encodeId}
                    sid={item.encodeId}
                    thumbnail={item.thumbnailM}
                    title={item.title}
                    artist={item.artistsNames}
                    order={index + 1}
                    percent={Math.ceil((item.score * 100) / chart?.totalScore)}
                    style={"w-full bg-[hsla(0,0%,100%,.07)] hover:bg-[#6C4984]"}
                  />
                ))}
            </div>
            <div className="w-fit flex justify-center m-auto">
              <Link
                to={path.ZINGCHART}
                className="px-6 py-1 border border-white text-white rounded-full text-[14px] hover:bg-[#5A2E78]"
              >
                Xem thêm
              </Link>
            </div>
          </div>
          <div className="flex-6 border border-white h-full relative">
            {data && <Line ref={chartRef} data={data} options={options} />}
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
                  rank.find((item) => item.encodeId === selected)?.thumbnailM
                }
                title={rank.find((item) => item.encodeId === selected)?.title}
                artist={
                  rank.find((item) => item.encodeId === selected)?.artistsNames
                }
                sid={rank.find((item) => item.encodeId === selected)?.encodeId}
                style={"bg-white"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
