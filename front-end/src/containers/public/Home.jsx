import {
  Section,
  Banner,
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
    <div className="flex flex-col gap-8 mt-10 w-full px-[59px]">
      <Banner data={banner} />
      <Section data={top100.items} title={top100?.title} />
      <Section data={newMusic.items} title={newMusic?.title} />
      <NewRelease data={newRelease} />
      <ChartSection />
      <WeekRank data={weekChart} />
      <div className="w-ful h-[500px]"></div>
    </div>
  );
};

export default Home;
