import { Header, Slider } from "../../components";

const Home = () => {
  return (
    <div className="overflow-y-auto flex flex-col gap-7">
      <div className="w-full h-[70px] px-[59px] flex items-center justify-between ">
        <Header />
      </div>
      <div className="w-full px-[59px]">
        <Slider />
      </div>
    </div>
  );
};

export default Home;
