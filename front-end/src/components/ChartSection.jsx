import React, { memo, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import SongItem from "./SongItem";
import { useSelector } from "react-redux";

const ChartSection = () => {
  const { chart, rank } = useSelector((state) => state.app);
  const [data, setData] = useState(null);
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
    // console.log({ labels, datasets });

    setData({ labels, datasets });
  }, [chart]);

  return (
    <div className="w-full mt-[48px] min-h-[400px] bg-[#4E1E6E] relative rounded-lg">
      <div className="absolute top-0 right-0 bottom-0 left-0 p-5">
        <h3 className="font-bold text-white text-2xl mb-5">#zingchart</h3>
        <div className="flex gap-7 h-[250px]">
          <div className="flex-4 flex flex-col gap-2">
            <div className="flex flex-col gap-3 w-full h-full">
              {rank
                ?.filter((_, index) => index <= 2)
                ?.map((item, index) => (
                  <SongItem
                    key={item.encodeId}
                    sid={item.encodeId}
                    thumbnail={item.thumbnailM}
                    title={item.title}
                    artist={item.artistsNames}
                    releaseDate={item.releaseDate}
                    order={index + 1}
                    percent={item.score}
                  />
                ))}
            </div>
            <div className="w-full flex justify-center">
              <button className="px-6 py-1 border border-white text-white rounded-full text-[14px]">
                Xem thêm
              </button>
            </div>
          </div>
          <div className="flex-6 border border-white h-full">
            {data && <Line data={data} options={options} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
