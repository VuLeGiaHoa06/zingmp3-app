import {
  Section,
  Slider,
  NewRelease,
  WeekRank,
  ChartSection,
} from "../../components";
import { useSelector } from "react-redux";

const Home = () => {
  const { banner, top100, newMusic, newRelease, weekChart } = useSelector(
    (state) => state.app
  );

  return (
    <div className="flex flex-col gap-7 mt-10">
      <div className="w-full px-[59px]">
        <Slider data={banner} />
        <Section data={top100} />
        <Section data={newMusic} />
        <NewRelease data={newRelease} />
        <ChartSection />
        <WeekRank data={weekChart} />
        <div className="w-ful h-[500px]"></div>
      </div>
    </div>
  );
};

export default Home;
